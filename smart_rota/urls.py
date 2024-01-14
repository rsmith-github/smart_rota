"""smart_rota URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import include
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView, # This view is used to obtain a pair of tokens: an access token and a refresh token.
    TokenRefreshView, # This view is used to obtain a new access token.
    TokenVerifyView, # This view is used to verify the validity of an access token.

)
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    # this could be changed to api/main as per the tutorial
    path('', include("main.urls")),
    # path('front', include("main.urls")),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path('manifest.json', TemplateView.as_view(
        template_name="manifest.json", content_type='application/json')),
]
