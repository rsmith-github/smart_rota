from ast import main
from django.urls import path

from . import views

# app_name = 'main'

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register-employer", views.register, name="register_manager"),
    path("register-employee", views.register, name="register"),
    path("register-company", views.register_company, name="register-company"),
]
