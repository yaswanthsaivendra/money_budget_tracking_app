from django.contrib import admin
from .models import (
    UserProfile,
    Personal_expense,
    Personal_income,
    debt,
    SplitRoom,
) 

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Personal_expense)
admin.site.register(Personal_income)
admin.site.register(debt)
admin.site.register(SplitRoom)
