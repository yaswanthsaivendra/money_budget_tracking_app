# Generated by Django 4.1.4 on 2023-01-04 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('splitter', '0012_debt_category_splitroom_category_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='expense',
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='income',
            field=models.PositiveBigIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='debt',
            name='category',
            field=models.CharField(choices=[('food', 'Food'), ('entertainment', 'Entertainment'), ('travelling', 'Travelling'), ('groceries', 'Groceries'), ('medical', 'Medical'), ('education', 'Education'), ('clothing', 'Clothing'), ('employment', 'Employment'), ('investment', 'Investment'), ('business', 'Business'), ('rental', 'Rental'), ('pension', 'Pension'), ('royalties', 'Royalties')], max_length=20),
        ),
        migrations.AlterField(
            model_name='personal_expense',
            name='category',
            field=models.CharField(choices=[('food', 'Food'), ('entertainment', 'Entertainment'), ('travelling', 'Travelling'), ('groceries', 'Groceries'), ('medical', 'Medical'), ('education', 'Education'), ('clothing', 'Clothing')], max_length=20),
        ),
        migrations.AlterField(
            model_name='personal_income',
            name='category',
            field=models.CharField(choices=[('employment', 'Employment'), ('investment', 'Investment'), ('business', 'Business'), ('rental', 'Rental'), ('pension', 'Pension'), ('royalties', 'Royalties')], max_length=20),
        ),
        migrations.AlterField(
            model_name='splitroom',
            name='category',
            field=models.CharField(choices=[('food', 'Food'), ('entertainment', 'Entertainment'), ('travelling', 'Travelling'), ('groceries', 'Groceries'), ('medical', 'Medical'), ('education', 'Education'), ('clothing', 'Clothing')], max_length=20),
        ),
    ]
