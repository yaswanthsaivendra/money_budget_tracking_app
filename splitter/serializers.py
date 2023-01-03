from rest_framework import serializers
from .models import (
    Personal_income,
    Personal_expense,
    Simple_transaction,
    UserProfile,
    Category, 
    SplitRoom
)
from django.contrib.auth.models import User



class PersonalIncomeSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Personal_income
        exclude = ['user']

class PersonalExpenseSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Personal_expense
        exclude = ['user']

class SimpleTransactionSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = Simple_transaction
        exclude = ['sender']





class UserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields=['id', 'username', 'email']

class FriendSerializer(serializers.Serializer):
    id = serializers.IntegerField()

class CategorySerializer(serializers.ModelSerializer):
    title = serializers.ReadOnlyField()

    class Meta:
        model = Category
        fields = '__all__'

class SplitRoomSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(read_only=True)
    creator = serializers.ReadOnlyField()

    class Meta:
        model = SplitRoom
        fields = '__all__'
