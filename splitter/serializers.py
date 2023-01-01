from rest_framework import serializers
from .models import (
    Personal_income,
    Personal_expense,
    Simple_transaction,
    UserProfile
)
from django.contrib.auth.models import User



class PersonalIncomeSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Personal_income
        exclude = ['user']

class PersonalExpenseSerializer(serializers.Serializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Personal_expense
        exclude = ['user']

class SimpleTransactionSerializer(serializers.Serializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Simple_transaction
        fields = '__all__'



class FriendSerializer(serializers.Serializer):
    friend = serializers.CharField(max_length=40)

class ListFriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=['username', 'email']
