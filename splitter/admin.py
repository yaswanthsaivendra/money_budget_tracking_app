from django.contrib import admin
from .models import (
    UserProfile,
    Personal_expense,
    Personal_income,
    Simple_transaction,
    SplitRoom,
    debt
) 

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(Personal_expense)
admin.site.register(Personal_income)
admin.site.register(Simple_transaction)
admin.site.register(SplitRoom)
admin.site.register(debt)
