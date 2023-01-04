from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    friends = models.ManyToManyField(User, related_name='friend_profiles', blank=True)
    income = models.PositiveBigIntegerField(default=0)
    expense = models.PositiveBigIntegerField(default=0)

    def __str__(self) -> str:
        return self.user.username


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)





class Personal_income(models.Model):
    CATEGORY_CHOICES = [
        ('employment', 'Employment'),
        ('investment', 'Investment'),
        ('business', 'Business'),
        ('rental', 'Rental'),
        ('pension', 'Pension'),
        ('royalties', 'Royalties')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self) -> str:
        return f"{self.user} income - {self.amount} under {self.category} category"

    
class Personal_expense(models.Model):
    CATEGORY_CHOICES = [
        ('food', 'Food'),
        ('entertainment', 'Entertainment'),
        ('travelling', 'Travelling'),
        ('groceries', 'Groceries'),
        ('medical', 'Medical'),
        ('education', 'Education'),
        ('clothing', 'Clothing')
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.PositiveIntegerField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    

    def __str__(self) -> str:
        return f"{self.user} expense - {self.amount} under {self.category} category"



class SplitRoom(models.Model):
    CATEGORY_CHOICES = [
       ('food', 'Food'),
        ('entertainment', 'Entertainment'),
        ('travelling', 'Travelling'),
        ('groceries', 'Groceries'),
        ('medical', 'Medical'),
        ('education', 'Education'),
        ('clothing', 'Clothing')
    ]

    name = models.CharField(max_length=40)
    amount = models.PositiveIntegerField()
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="creator_splitroom")
    payer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="payer_splitroom")
    splitters = models.ManyToManyField(User, related_name='member_splitrooms')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self) -> str:
        return f"Room - {self.name} with split amount {self.amount}"

    
class debt(models.Model):
    CATEGORY_CHOICES = [
        ('food', 'Food'),
        ('entertainment', 'Entertainment'),
        ('travelling', 'Travelling'),
        ('groceries', 'Groceries'),
        ('medical', 'Medical'),
        ('education', 'Education'),
        ('clothing', 'Clothing'),

        ('employment', 'Employment'),
        ('investment', 'Investment'),
        ('business', 'Business'),
        ('rental', 'Rental'),
        ('pension', 'Pension'),
        ('royalties', 'Royalties')
    ]
    
    room = models.ForeignKey(SplitRoom, on_delete=models.CASCADE, related_name='room_debts', blank=True, null=True)
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transaction_sender')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transaction_receiver')
    amount = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)


    def __str__(self) -> str:
        return f"{self.sender} paying to {self.receiver} in room {self.room.name}"
