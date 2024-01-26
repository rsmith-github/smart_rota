

from django.contrib.auth.password_validation import validate_password
from django.core import exceptions
from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Company, TimeTable, User, Messages


class RegisterSeriazlizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'employer_code',
                  'user_type', 'password')

    def validate(self, data):
        user = User(**data)
        password = data.get('password')
        try:
            validate_password(password, user)
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serializer_errors['non_field_errors']}
            )
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            employer_code=validated_data.get('employer_code', None),
            user_type=validated_data.get('user_type', None),
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'employer_code', 'user_type')


class TimeTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTable
        fields = ('username', 'employer_code', 'date',
                  'morning_shift', 'evening_shift')


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = (
            'from_user',
            'employer_code',
            'message_type',
            'to_user',
            'content',
            'date',
            'morning_shift',
            'evening_shift',
        )
