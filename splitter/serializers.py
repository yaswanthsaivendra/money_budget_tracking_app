from rest_framework import serializers
from .models import (
    Personal_income,
    Personal_expense,
    debt,
    UserProfile,
    SplitRoom
)
from django.contrib.auth.models import User



class PersonalIncomeSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Personal_income
        fields = '__all__'
        read_only_fields = ['user']

class PersonalExpenseSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Personal_expense
        fields = '__all__'
        read_only_fields = ['user']

class TransactionSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = debt
        fields = '__all__'
        read_only_fields = ['sender']





class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields=['id', 'username', 'email']

class FriendSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class SplitRoomSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = SplitRoom
        fields = '__all__'
        read_only_fields = ['creator']
        
