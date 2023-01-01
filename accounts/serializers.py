from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import ValidationError
from rest_framework.authtoken.models import Token


class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=40)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model=User
        fields=['email', 'username', 'password']

    def validate(self, attrs):

        email_exists = User.objects.filter(email=attrs['email']).exists()

        if email_exists:
            raise ValidationError("Email is already in use")

        username_exists = User.objects.filter(username=attrs['username']).exists()

        if username_exists:
            raise ValidationError("username is already in use")

        return super().validate(attrs)

    def create(self, validated_data):
        password = validated_data.pop("password")

        user = super().create(validated_data)
        user.set_password(password)
        user.save()

        Token.objects.create(user=user)

        return user