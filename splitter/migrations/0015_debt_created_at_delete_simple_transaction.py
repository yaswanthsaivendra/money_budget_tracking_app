# Generated by Django 4.1.4 on 2023-01-04 12:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('splitter', '0014_alter_debt_room'),
    ]

    operations = [
        migrations.AddField(
            model_name='debt',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.DeleteModel(
            name='simple_transaction',
        ),
    ]
