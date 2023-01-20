from django.contrib.auth.models import AbstractUser
from django.db import models


# add following and followers
class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    employer_code = models.CharField(max_length=255, null=True)
    user_type = models.CharField(max_length=255, null=True)
    pass


class Company(models.Model):
    company_name = models.CharField(max_length=225, null=False, unique=True)
    company_code = models.CharField(max_length=225, null=False, unique=True)

    def __str__(self):
        return f"Company: {self.company_name}"
