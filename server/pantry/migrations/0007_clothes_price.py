# Generated by Django 3.2.8 on 2021-11-03 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pantry', '0006_auto_20211013_1235'),
    ]

    operations = [
        migrations.AddField(
            model_name='clothes',
            name='price',
            field=models.IntegerField(default=100),
        ),
    ]
