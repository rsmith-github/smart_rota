from glob import escape
from django.shortcuts import render
from django.http import Http404, HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse, resolve
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django import forms

from django.core import serializers


from manage import main
from .models import Company, User
import uuid


# This can be passed into any template like other types of data. e.g.
# return render(request, "main/index.html", {form: NewForm()})
class NewForm(forms.Form):
    user_type = forms.CharField(label="User Type")
    # Constraints can also be added. E.g.
    age = forms.IntegerField(label="Age", min_value=1, max_value=10)

# When posting:
# We can validate data using the following syntax:
# if request.method == "POST":
#   form = NewForm(request.POST)
    # if form.is_valid():
    #     user_type = form.cleaned_data["user_type"]
    #     do something with the data.
# ELSE DO SERVER SIDE VALIDATION SO ERROR MESSAGE CAN BE DISPLAYED/
    # else:
    #     return render(request, "some/page.html" {
    #         form: form
    #     })


def index(request):
    return render(request, "main/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
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
        return render(request, "main/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    url_name = request.path

    # Filter user type based on url
    user_type = ""
    if (url_name == "/register-employer"):
        user_type = "Manager"
    elif (url_name == "/register-employee"):
        user_type = "Employee"

    if request.method == "POST":

        username = request.POST["username"]
        email = request.POST["email"]
        code = request.POST["employer-code"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "main/register.html", {
                "message": "Passwords must match."
            })
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.employer_code = code
            user.user_type = user_type
            print(user.user_type)
            user.save()
        except IntegrityError:
            return render(request, "main/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        # Check user type. Employer or employee?
        if (user_type == "Manager"):
            return render(request, "main/register.html", {"user_type": "employer"})
        elif (user_type == "Employee"):
            return render(request, "main/register.html", {"user_type": "employee"})


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


# API endpoints

# get team members (users whose company code matches the request sender.)
def get_team(request):

    # allow only post requests
    if request.method == "GET":
        return HttpResponse("Access Denied")

    if request.user.user_type != "Manager":
        print("Non-manager requested team data")
        return
    
    # get manager who sent request
    user_object = User.objects.get(username=request.user)

    # filter team based on company code.
    team = User.objects.filter(
        employer_code=user_object.employer_code, user_type="Employee")

    # send back json.
    new = serializers.serialize('json', team)
    return HttpResponse(new)
