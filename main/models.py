from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin, AbstractBaseUser
from django.db import models


# add following and followers
class User(AbstractUser):
    id = models.AutoField(primary_key=True)
    employer_code = models.CharField(max_length=255, null=True)
    user_type = models.CharField(max_length=255, null=True)
    is_active = models.BooleanField(default=True)

    USERNAME_FIELD = "username"
    # REQUIRED_FIELDS = ["password"]

    pass


class Company(models.Model):
    company_name = models.CharField(max_length=225, null=False, unique=True)
    company_code = models.CharField(max_length=225, null=False, unique=True)

    def __str__(self):
        return f"Company: {self.company_name}"


class UserAccountManager(BaseUserManager):
    def create_user(self, first_name, last_name, email, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)
        email.lower()

        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, first_name, last_name, email, password=None):

        user = self.create_user(
            email,
            first_name,
            last_name,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.CharField(unique=True, max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class TimeTable(models.Model):
    fields = ('username', 'employer_code', 'date',
              'morning_shift', 'evening_shift')
    username = models.CharField(max_length=255)
    employer_code = models.CharField(max_length=255, null=True)
    date = models.DateField()
    # this is going to be a range hence charfield not time
    morning_shift = models.CharField(max_length=255)
    evening_shift = models.CharField(max_length=255)


# Need to know which employee sent the request, which company they belong to, and the message type, so that all managers can see the change request.
class Messages(models.Model):

    from_user = models.CharField(max_length=255)
    employer_code = models.CharField(max_length=255)
    message_type = models.CharField(max_length=255)
    to_user = models.CharField(max_length=255, null=True)
    content = models.TextField(null=True)
