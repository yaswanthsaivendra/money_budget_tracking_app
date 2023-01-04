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
    SplitRoomSerializer,
    UserSerializer
)
from .models import (
    Personal_expense,
    Personal_income,
    Simple_transaction,
    UserProfile,
    SplitRoom,
    debt
)

# Create your views here.

## all-users

class AllUsersListView(GenericAPIView,
    ListModelMixin
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()


    def get(self, request:Request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    

##Friends

class AddFriendApiView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FriendSerializer

    def post(self, request:Request, *args, **kwargs):
        data = request.data

        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            print(serializer)
            id = serializer.data['id']
            friend = User.objects.filter(id=id).first()
            if not friend:
                return Response(data={"message":"requested user does not exist", "type" : "failure"}, status=status.HTTP_400_BAD_REQUEST)
            userprofile = UserProfile.objects.get(user=request.user)
            userprofile.friends.add(friend)
            userprofile.save()

            response = {
                "message" : "Added as Friend",
                "type" : "success",
                "data" : serializer.data
            }
            return Response(data=response, status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ListFriendsApiView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

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
            id = serializer.validated_data["id"]
            friend = User.objects.filter(id=id).first()
            if not friend:
                return Response(data={"message":"requested user does not exist", "type" : "failure"}, status=status.HTTP_400_BAD_REQUEST)
            userprofile = UserProfile.objects.get(user=request.user)
            userprofile.friends.remove(friend)
            userprofile.save()

            response = {
                "message" : "Friend Deleted",
                "type" : "success",
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

    def get_queryset(self):
        return Personal_income.objects.all().order_by('-created_at').filter(user=self.request.user)

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

    def get_queryset(self):
        return Personal_income.objects.all().order_by('-created_at').filter(user=self.request.user)

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

    def get_queryset(self):
        return Personal_expense.objects.all().order_by('-created_at').filter(user=self.request.user)

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

    def get_queryset(self):
        return Personal_expense.objects.all().order_by('-created_at').filter(user=self.request.user)


    def get(self, request:Request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request:Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request:Request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)



## personal Budget

class PersonalBudgetApiView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request:Request):
        all_incomes = Personal_income.objects.filter(user=self.request.user)
        all_expenses = Personal_expense.objects.filter(user=self.request.user)

        total_income = sum([x.amount for x in all_incomes])
        total_expense = sum([x.amount for x in all_expenses])
        total_budget = total_income - total_expense

        response = {
            "total_income": total_income,
            "total_expense": total_expense,
            "total_budget": total_budget,
        }
        return Response(data=response, status=status.HTTP_200_OK)




## simple transaction




## Split rooms


class SplitRoomListCreateView(GenericAPIView,
    ListModelMixin,
    CreateModelMixin
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = SplitRoomSerializer

    # def get_queryset(self):
    #     return SplitRoom.objects.all().order_by('-created_at').filter(splitters=self.request.user)

    def perform_create(self, serializer):
        splitroom = serializer.save(creator=self.request.user)
        splitters = serializer.validated_data["splitters"]
        payer = serializer.validated_data["payer"]
        for splitter in splitters:
            if splitter == payer :
                pass
            else :
                debt.objects.create(room = splitroom, receiver=payer, sender=splitter, amount=int(splitroom.amount)/len(splitters))
        return super().perform_create(serializer)


    # def get(self, request:Request, *args, **kwargs):
    #     return self.list(request, *args, **kwargs)

    def post(self, request:Request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class SplitRoomRetrieveUpdateDeleteView(
    GenericAPIView,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin
    ):

    permission_classes = [IsAuthenticated]

    serializer_class = SplitRoomSerializer

    def get_queryset(self):
        return SplitRoom.objects.all().order_by('-created_at').filter(creator=self.request.user)

    def perform_update(self, serializer):
        updated_splitroom = serializer.save()
        debts = debt.objects.filter(room=updated_splitroom)
        splitters = serializer.validated_data["splitters"]
        payer = serializer.validated_data["payer"]
        debts.delete()
        for splitter in splitters:
            if splitter == payer :
                pass
            else :
                debt.objects.create(room = updated_splitroom, receiver=payer, sender=splitter, amount=int(updated_splitroom.amount)/len(splitters))
        return super().perform_update(serializer)


    def get(self, request:Request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request:Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def perform_destroy(self, instance):
        debts = debt.objects.filter(room=instance)
        debts.delete()
        return super().perform_destroy(instance)

    def delete(self, request:Request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)