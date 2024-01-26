from ast import main
from django.urls import path

from . import views

# app_name = 'main'

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("api/logout", views.logout_api),
    path("register-employer", views.RegisterView.as_view()),
    path("register-employee", views.RegisterView.as_view()),
    path("register-company", views.CompanyRegistrationView.as_view()),
    path("rota", views.index),
    path("me", views.RetrieveUserView.as_view()),
    path('verify', views.verify, name='verify'),
    path("team", views.index),
    path("api/team", views.get_team, name="get-team"),
    path("api/update-timetable", views.UpdateTimetableView.as_view()),
    path("api/get-timetable", views.GetMemberShiftsData.as_view()),
    path("api/request-change", views.RequestShiftChange.as_view()),
    path("api/get-change-requests", views.GetChangeRequests.as_view())



    # path("front", views.front, name="front"),
]
