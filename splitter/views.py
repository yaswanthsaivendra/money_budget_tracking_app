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
    TransactionSerializer,
    FriendSerializer,
    SplitRoomSerializer,
    UserSerializer
)
from .models import (
    Personal_expense,
    Personal_income,
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
        personal_income = serializer.save(user=self.request.user)
        user_profile = UserProfile.objects.get(user=self.request.user)
        user_profile.income += personal_income.amount
        user_profile.save(update_fields=['income'])
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

    def perform_update(self, serializer):
        old_income = self.get_object().amount
        updated_income = serializer.save()
        user_profile = UserProfile.objects.get(user=self.request.user)
        user_profile.income -= old_income
        user_profile.income += updated_income.amount
        user_profile.save(update_fields=['income'])
        return super().perform_update(serializer)

    def put(self, request:Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def perform_destroy(self, instance):
        income = instance.amount
        user_profile = UserProfile.objects.get(user=self.request.user)
        user_profile.income -= income
        user_profile.save(update_fields=['income'])
        return super().perform_destroy(instance)

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
        personal_expense = serializer.save(user=self.request.user)
        user_profile = UserProfile.objects.get(user=self.request.user)
        user_profile.expense += personal_expense.amount
        user_profile.save(update_fields=['expense'])
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

    def perform_update(self, serializer):
        old_expense = self.get_object().amount
        updated_expense = serializer.save()
        user_profile = UserProfile.objects.get(user=self.request.user)
        user_profile.expense -= old_expense
        user_profile.expense += updated_expense.amount
        user_profile.save(update_fields=['expense'])
        return super().perform_update(serializer)

    def put(self, request:Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def perform_destroy(self, instance):
        expense = instance.amount
        user_profile = UserProfile.objects.get(user=self.request.user)
        user_profile.expense -= expense
        user_profile.save(update_fields=['expense'])
        return super().perform_destroy(instance)

    def delete(self, request:Request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)



## personal Budget

class PersonalBudgetApiView(APIView):
    permission_classes = [IsAuthenticated]


    def get(self, request:Request):
        user_profile = UserProfile.objects.get(user=self.request.user)
        total_income = user_profile.income
        total_expense = user_profile.expense
        total_budget = total_income - total_expense
        response = {
            "total_income": total_income,
            "total_expense": total_expense,
            "total_budget": total_budget,
        }
        return Response(data=response, status=status.HTTP_200_OK)




## simple transaction


class TransactionListCreateView(GenericAPIView,
    ListModelMixin,
    CreateModelMixin
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = TransactionSerializer

    def get_queryset(self):
        queryset1 = debt.objects.all().filter(sender=self.request.user).filter(is_paid=True)
        queryset2 = debt.objects.all().filter(receiver=self.request.user).filter(is_paid=True)
        queryset = queryset1.union(queryset2)
        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        transaction_obj = serializer.save(sender=self.request.user)
        sender = UserProfile.objects.get(user=transaction_obj.sender)
        receiver = UserProfile.objects.get(user=transaction_obj.receiver)
        sender.income -= transaction_obj.amount
        receiver.income += transaction_obj.amount
        sender.save(update_fields=['income'])
        receiver.save(update_fields=['income'])
        return super().perform_create(serializer)

    def get(self, request:Request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request:Request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class TransactionRetrieveUpdateDeleteView(
    GenericAPIView,
    UpdateModelMixin,
    ):

    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return debt.objects.filter(sender=self.request.user)


    def perform_update(self, serializer):
        transaction_obj = serializer.save()
        sender = UserProfile.objects.get(user=transaction_obj.sender)
        receiver = UserProfile.objects.get(user=transaction_obj.receiver)
        sender.income -= transaction_obj.amount
        receiver.income += transaction_obj.amount
        sender.save(update_fields=['income'])
        receiver.save(update_fields=['income'])
        return super().perform_update(serializer)


    def put(self, request:Request, *args, **kwargs):
        return self.update(request, *args, **kwargs)




## Split rooms




class SplitRoomListCreateView(GenericAPIView,
    ListModelMixin,
    CreateModelMixin
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = SplitRoomSerializer

    def get_queryset(self):
        queryset1 = SplitRoom.objects.all().filter(splitters=self.request.user)
        queryset2 = SplitRoom.objects.all().filter(creator=self.request.user)
        queryset3 = SplitRoom.objects.all().filter(payer=self.request.user)
        queryset = queryset1.union(queryset2).union(queryset3)
        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        splitroom = serializer.save(creator=self.request.user)
        splitters = serializer.validated_data["splitters"]
        payer = serializer.validated_data["payer"]
        for splitter in splitters:
            if splitter == payer :
                pass
            else :
                debt.objects.create(room = splitroom, receiver= splitroom.payer, sender=splitter, amount=int(splitroom.amount)/len(splitters), category=splitroom.category)
        return super().perform_create(serializer)


    def get(self, request:Request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

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
                debt.objects.create(room = updated_splitroom, receiver=payer, sender=splitter, amount=int(updated_splitroom.amount)/len(splitters), category=updated_splitroom.category)
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




class PersonalIncomeListCreateView(GenericAPIView,
    ListModelMixin,
    CreateModelMixin
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = PersonalIncomeSerializer

    def get_queryset(self):
        return Personal_income.objects.all().order_by('-created_at').filter(user=self.request.user)

    def perform_create(self, serializer):
        personal_income = serializer.save(user=self.request.user)
        user_profile = UserProfile.objects.get(user=self.request.user)
        user_profile.income += personal_income.amount
        user_profile.save(update_fields=['income'])
        return super().perform_create(serializer)

    def get(self, request:Request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request:Request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class GetSplitRoomTransactionsListView(GenericAPIView,
    ListModelMixin,
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = TransactionSerializer

    def get_queryset(self):
        return debt.objects.all().order_by('-created_at').filter(room=self.kwargs['id'])



    def get(self, request:Request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


## debt and credits

class DebtsListView(GenericAPIView,
    ListModelMixin,
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = TransactionSerializer

    def get_queryset(self):
        queryset = debt.objects.all().filter(sender=self.request.user).filter(is_paid=False)
        return queryset.order_by('-created_at')


    def get(self, request:Request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class CreditsListView(GenericAPIView,
    ListModelMixin,
    ):
    permission_classes = [IsAuthenticated]

    serializer_class = TransactionSerializer

    def get_queryset(self):
        queryset = debt.objects.all().filter(receiver=self.request.user).filter(is_paid=False)
        return queryset.order_by('-created_at')


    def get(self, request:Request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

