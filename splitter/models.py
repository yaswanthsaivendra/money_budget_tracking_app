from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, related_name='friend_profiles')

    def __str__(self) -> str:
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)



class Category(models.Model):
    title = models.CharField(max_length=15)

    def __str__(self) -> str:
        return self.title



class Personal_income(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self) -> str:
        return f"{self.user} income - {self.amount} under {self.category} category"

    
class Personal_expense(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self) -> str:
        return f"{self.user} expense - {self.amount} under {self.category} category"


class Simple_transaction(models.Model):
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='reciever')
    amount = models.PositiveIntegerField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self) -> str:
        return f"{self.sender.username} sending amount {self.amount} to {self.receiver.username} under {self.category} category"