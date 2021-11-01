# Generated by Django 3.2.8 on 2021-10-10 18:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pantry', '0002_auto_20210927_0013'),
    ]

    operations = [
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='Enter the name of the school', max_length=100)),
                ('is_active', models.BooleanField(help_text='Is this school still in use? (Affects if it appears in when checking out)')),
            ],
        ),
        migrations.CreateModel(
            name='Verse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('verse', models.CharField(max_length=15)),
                ('passage', models.TextField(max_length=700)),
            ],
        ),
        migrations.AddField(
            model_name='clothes',
            name='school',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='pantry.school'),
        ),
    ]