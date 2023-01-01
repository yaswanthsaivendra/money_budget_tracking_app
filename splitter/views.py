from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.mixins import (
    ListModelMixin,
    CreateModelMixin,
    UpdateModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin
)
from .serializers import (
    PersonalExpenseSerializer,
    PersonalIncomeSerializer,
    SimpleTransactionSerializer,
    FriendSerializer,
    ListFriendsSerializer
)
from .models import (
    Personal_expense,
    Personal_income,
    Simple_transaction,
    UserProfile
)

# Create your views here.

##Friends

class AddFriendApiView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendSerializer

    def post(self, request:Request, *args, **kwargs):
        data = request.data


        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            friend = serializer.validated_data["friend"]
            friend = User.objects.filter(username=friend).first()
            if not friend:
                return Response(data={"message":"requested user does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            userprofile = UserProfile.objects.get(user=request.user)
            userprofile.friends.add(friend)
            userprofile.save()

            response = {
                "message" : "Added as Friend",
                "data" : serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListFriendsApiView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ListFriendsSerializer

    def get(self, request:Request, *args, **kwargs):
        userprofile = UserProfile.objects.get(user=request.user)
        friends = userprofile.friends.all()

        serializer = self.serializer_class(instance=friends, many=True)

        
        return Response(data=serializer.data, status=status.HTTP_200_OK)



class DeleteFriendApiView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendSerializer

    def post(self, request:Request, *args, **kwargs):
        data = request.data


        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            friend = serializer.validated_data["friend"]
            friend = User.objects.filter(username=friend).first()
            if not friend:
                return Response(data={"message":"requested user does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            userprofile = UserProfile.objects.get(user=request.user)
            userprofile.friends.remove(friend)
            userprofile.save()

            response = {
                "message" : "Friend Deleted",
                "data" : serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)



## Income

class PersonalIncomeListCreateView(GenericAPIView,
    ListModelMixin,
    CreateModelMixin
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = PersonalIncomeSerializer
    queryset = Personal_income.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)

    def get(self, request:Request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request:Request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class PersonalIncomeRetrieveUpdateDeleteView(
    GenericAPIView,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin
    ):

    permission_classes = [IsAuthenticated]
    serializer_class = PersonalIncomeSerializer
    queryset = Personal_income.objects.all()

    def get(self, request:Request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request:Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request:Request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


##Expenditure

class PersonalExpenseListCreateView(GenericAPIView,
    ListModelMixin,
    CreateModelMixin
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = PersonalExpenseSerializer
    queryset = Personal_expense.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        return super().perform_create(serializer)

    def get(self, request:Request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request:Request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class PersonalExpenseRetrieveUpdateDeleteView(
    GenericAPIView,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin
    ):

    permission_classes = [IsAuthenticated]

    serializer_class = PersonalExpenseSerializer
    queryset = Personal_expense.objects.all()


    def get(self, request:Request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request:Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request:Request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


## simple transaction