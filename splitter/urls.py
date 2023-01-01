from django.urls import path
from .views import (
    PersonalIncomeListCreateView,
    PersonalIncomeRetrieveUpdateDeleteView,
    AddFriendApiView,
    ListFriendsApiView,
    DeleteFriendApiView
)

urlpatterns = [
    path("personal-income/", PersonalIncomeListCreateView.as_view()),
    path("personal-income/<int:pk>/", PersonalIncomeRetrieveUpdateDeleteView.as_view()),
    path("list-friends/", ListFriendsApiView.as_view()),
    path("add-friend/", AddFriendApiView.as_view()),
    path("delete-friend/", DeleteFriendApiView.as_view()),
]