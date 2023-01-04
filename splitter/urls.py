from django.urls import path
from .views import (
    PersonalIncomeListCreateView,
    PersonalIncomeRetrieveUpdateDeleteView,
    PersonalExpenseListCreateView,
    PersonalExpenseRetrieveUpdateDeleteView,
    AddFriendApiView,
    ListFriendsApiView,
    DeleteFriendApiView,
    PersonalBudgetApiView,
    SplitRoomListCreateView,
    AllUsersListView,
    SplitRoomRetrieveUpdateDeleteView,
)

urlpatterns = [
    # Income and expense
    path("personal-income/", PersonalIncomeListCreateView.as_view()),
    path("personal-income/<int:pk>/", PersonalIncomeRetrieveUpdateDeleteView.as_view()),
    path("personal-expense/", PersonalExpenseListCreateView.as_view()),
    path("personal-expense/<int:pk>/", PersonalExpenseRetrieveUpdateDeleteView.as_view()),
    # Friends
    path("list-friends/", ListFriendsApiView.as_view()),
    path("add-friend/", AddFriendApiView.as_view()),
    path("delete-friend/", DeleteFriendApiView.as_view()),
    # Personal Budget
    path("personal-budget/", PersonalBudgetApiView.as_view()),
    # Split Rooms
    path("splitroom/", SplitRoomListCreateView.as_view() ),
    path("splitroom/<int:pk>/", SplitRoomRetrieveUpdateDeleteView.as_view() ),
    # all users 
    path("list-users/", AllUsersListView.as_view() ),

]