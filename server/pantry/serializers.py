from rest_framework import serializers
from django.contrib.auth.models import User, Group, Permission
from .models import Category, Clothes, Color, Condition, File, Gender, Size

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'is_active')

class ClothesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clothes
        fields = ('id', 'category', 'size', 'gender', 'color', 'condition', 'image', 'user', 'file', 'brand', 'description', 'inventory_date', 'date_checked_out' )

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ('id', 'name', 'is_active')

class ConditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Condition
        fields = ('id', 'name', 'is_active')

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File

class GenderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gender
        fields = ('id', 'name', 'is_active')

class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('id', 'content_type', 'codename', 'name')

class GroupSerializer(serializers.ModelSerializer):
    permissions_details = PermissionSerializer(many=True, read_only=True, source='permissions')

    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions', 'permissions_details')

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ('id', 'name', 'category', 'is_active')

class UserSerializer(serializers.ModelSerializer):
    groups_details = GroupSerializer(many=True, read_only=True, source='groups')

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'last_login', 'groups', 'groups_details', 'is_superuser', 'is_staff', 'is_active', 'date_joined')