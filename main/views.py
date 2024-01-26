
from rest_framework import status
from django.conf import settings
from django.views.decorators.http import require_GET
import os
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout

from django.core import serializers

from .utlis import check_message_duplicates

from .models import Company, User, TimeTable, Messages


import uuid

# REST imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from .serializers import RegisterSeriazlizer, TimeTableSerializer, UserSerializer, MessageSerializer
from rest_framework.serializers import ValidationError

# This can be passed into any template like other types of data. e.g.
# return render(request, "main/index.html", {form: NewForm()})
from datetime import datetime
import requests
from django.http import JsonResponse

from pprint import pprint


def verify(request):

    if request.method == 'GET':
        access_token = request.META.get(
            'HTTP_AUTHORIZATION', '').split(' ')[-1]
        payload = {
            'token': access_token
        }

        try:
            api_response = requests.post(
                'http://localhost:8000/api/token/verify/',
                headers={
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                json=payload
            )

            data = api_response.json()
            return JsonResponse(data, status=api_response.status_code)
        except Exception as err:
            return JsonResponse({'error': 'Something went wrong when trying to verify login status'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)


def index(request):
    # return render(request, "main/index.html")
    context = {}
    return render(request, "index.html", context)


def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        # Attempt to sign user in
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "main/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        context = {}
        return render(request, "index.html", context)


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


@require_GET
def logout_api(request):
    response = JsonResponse({'success': 'Logged out successfully'})

    response.set_cookie('access_token', '', httponly=True, expires=0, path='/api/',
                        samesite='Strict', secure=(request.is_secure() or settings.DEBUG))
    response.set_cookie('refresh_token', '', httponly=True, expires=0, path='/api/',
                        samesite='Strict', secure=(request.is_secure() or settings.DEBUG))

    return response


def register_company(request):
    # Declare message
    message = ""
    if request.method == "POST":

        # Get company info
        company_name = request.POST["company-name"]
        # Create unique ID
        unique_id = uuid.uuid4()

        # Save company information
        new_company = Company(company_name=company_name,
                              company_code=unique_id)
        print(Company.objects.all().filter(company_name=company_name))
        # Handle unique constraint
        if Company.objects.all().filter(company_name=company_name):
            message = "Company already exists."
        else:
            new_company.save()
            message = "Registered successfuly! your company code is: " + \
                str(unique_id) + ". Please write it down and do not lose it."

        # return HttpResponseRedirect(reverse('register-company'))
        return render(request, "main/company.html", {"message": message})
    # Handle get request
    else:
        return render(request, "main/company.html", {"message": message})


class CompanyRegistrationView(APIView):

    def post(self, request):
        # Get company info
        company_name = request.data.get("company-name")

        # Create unique ID
        unique_id = uuid.uuid4()

        # Save company information
        new_company = Company(company_name=company_name,
                              company_code=unique_id)
        # Handle unique constraint
        if Company.objects.filter(company_name=company_name).exists():
            message = "Company already exists."
            return Response({'message': message}, status=status.HTTP_409_CONFLICT)
        else:
            new_company.save()
            return Response({'code': unique_id}, status=status.HTTP_201_CREATED)

    def get(self, request):
        print("get request")
        context = {}
        return render(request, "index.html", context)


# get team members (users whose company code matches the request sender.)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_team(request):
    # allow only post requests
    if request.method == "GET":
        return HttpResponse("Access Denied", status=405)
    if request.user.user_type != "Manager":
        print("Non-manager requested team data")
        return

    # get manager who sent request
    user_object = User.objects.get(username=request.user)

    # filter team based on company code.
    team = User.objects.filter(
        employer_code=user_object.employer_code)

    # send back json.
    new = serializers.serialize('json', team)
    return HttpResponse(new)


class RegisterView(APIView):
    def post(self, request):
        data = request.data

        serializer = RegisterSeriazlizer(data=data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)

        # generate token with the user id and username
        refresh = RefreshToken.for_user(user.instance)
        token = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user_id": user.instance.pk,
            "username": user.instance.username
        }

        return Response(token, status=status.HTTP_201_CREATED)

    def get(self, request):
        context = {}
        return render(request, "index.html", context)


class RetrieveUserView(APIView):

    """
        The RetrieveUserView is protected by the permissions.IsAuthenticated permission class.
        This permission class requires a valid access token to be present in the Authorization header of the incoming request.
        It expects a format like Bearer <token>.
        (see getUser() in user.js)
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        user = UserSerializer(user)

        return Response(user.data, status=status.HTTP_200_OK)


def login_api(request):
    email = request.POST.get('email')
    password = request.POST.get('password')
    url = f"{os.environ['API_URL']}/api/token/"
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    data = {
        "email": email,
        "password": password,
    }

    try:
        response = requests.post(url, headers=headers, json=data)
        response.raise_for_status()
        data = response.json()

        access_cookie = {
            "key": "access",
            "value": data["access"],
            "httponly": True,
            "max-age": 60 * 120,
            "path": "/api/",
            "samesite": "Strict",
            "secure": request.is_secure(),
        }

        refresh_cookie = {
            "key": "refresh",
            "value": data["refresh"],
            "httponly": True,
            "max-age": 60 * 60 * 24,
            "path": "/api/",
            "samesite": "Strict",
            "secure": request.is_secure(),
        }

        response = JsonResponse({"success": "Logged in successfully"})
        response.set_cookie(**access_cookie)
        response.set_cookie(**refresh_cookie)

        return response

    except requests.exceptions.RequestException:
        return JsonResponse(
            {"error": "Something went wrong when logging in"},
            status=500
        )
    # except requests.exceptions.HTTPError as e:
    #     response = JsonResponse(e.response.json())
    #     response.status_code = e.response.status_code
    #     return response


class UpdateTimetableView(APIView):
    def post(self, request):
        user_and_timetable = request.data
        username = user_and_timetable['username']
        employer_code = User.objects.get(username=username).employer_code

        time_table_data = user_and_timetable['timeTable']

        for time_object in time_table_data:
            morning_shift_start = time_object['morningShift']['start']
            morning_shift_end = time_object['morningShift']['end']
            evening_shift_start = time_object['eveningShift']['start']
            evening_shift_end = time_object['eveningShift']['end']

            if (morning_shift_start != '99:99' and morning_shift_end != '99:99') or \
                    (evening_shift_start != '99:99' and evening_shift_end != '99:99'):
                # Convert the date format to "YYYY-MM-DD"
                date = time_object['date']
                formatted_date = datetime.strptime(
                    date, "%d-%m-%y").strftime("%Y-%m-%d")

                # Create a dictionary with the data to be saved
                timetable_data = {
                    'username': username,
                    'employer_code': employer_code,
                    'date': formatted_date,
                    'morning_shift': f"{morning_shift_start}-{morning_shift_end}",
                    'evening_shift': f"{evening_shift_start}-{evening_shift_end}"
                }
                print(timetable_data)

                # check if shift exists for user on specified date.
                exists = TimeTable.objects.filter(
                    date=formatted_date, username=username).exists()

                if exists:
                    work_shift_object = TimeTable.objects.get(
                        date=formatted_date, username=username)
                    work_shift_object.morning_shift = timetable_data['morning_shift']
                    work_shift_object.evening_shift = timetable_data['evening_shift']
                    work_shift_object.save()
                else:
                    # Serialize and save the data
                    serializer = TimeTableSerializer(data=timetable_data)
                    try:
                        serializer.is_valid(raise_exception=True)
                        serializer.save()
                    except ValidationError as e:
                        print(e)
                        return Response("BAD REQUEST", status=status.HTTP_400_BAD_REQUEST)

        return Response("OK", status=status.HTTP_200_OK)


class GetMemberShiftsData(APIView):
    def post(self, request):

        # Get timetable user that sent the request
        data = json.loads(request.body)

        # return user's shifts
        shifts = TimeTable.objects.filter(username=data['username'])

        shifts_as_dict = {'username': data['username']}

        for shift in shifts:
            shifts_as_dict[f'{shift.date.day}-{shift.date.month}-{str(shift.date.year)[2:]}'] = {
                'morning_shift': shift.morning_shift, 'evening_shift': shift.evening_shift}

        return JsonResponse(shifts_as_dict, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class RequestShiftChange(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):

        data = json.loads(request.body)

        pprint(data)

        user = data['user']
        morning_shift = data['newShift']['morningShift']
        evening_shift = data['newShift']['eveningShift']

        new_morning_shift = f"{morning_shift['start']}-{morning_shift['end']}"
        new_evening_shift = f"{evening_shift['start']}-{evening_shift['end']}"

        # prevent duplicates
        is_dupicate = check_message_duplicates(
            user, new_morning_shift, new_evening_shift)

        if is_dupicate:
            return JsonResponse(
                {'message': 'Shift already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save request to database
        new_request = Messages(from_user=user['username'], employer_code=user['employer_code'],
                               message_type=settings.CHANGE_REQUEST,  morning_shift=new_morning_shift, evening_shift=new_evening_shift)

        new_request.save()

        return JsonResponse(data, status=status.HTTP_200_OK)


class GetChangeRequests(APIView):

    def put(self, request):

        # validate if the user is a manager
        data = json.loads(request.body)
        user = data['user']
        
        
    
        if user['user_type'] == 'Manager':
        
            change_requests = Messages.objects.filter(employer_code=user['employer_code'])
            
            
            serialized = serializers.serialize('json', change_requests)
        

            return JsonResponse({'change_requests': serialized}, status=status.HTTP_200_OK)
