from rest_framework import serializers
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

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ('id', 'name', 'category', 'is_active')