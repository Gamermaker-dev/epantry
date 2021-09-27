from django.shortcuts import render
from rest_framework import viewsets
from .serializers import CategorySerializer, ClothesSerializer, ColorSerializer, ConditionSerializer, FileSerializer, GenderSerializer, SizeSerializer
from .models import Category, Clothes, Color, Condition, File, Gender, Size

# Create your views here.
class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class ClothesView(viewsets.ModelViewSet):
    serializer_class = ClothesSerializer
    queryset = Clothes.objects.all()

class ColorView(viewsets.ModelViewSet):
    serializer_class = ColorSerializer
    queryset = Color.objects.all()

class ConditionView(viewsets.ModelViewSet):
    serializer_class = ConditionSerializer
    queryset = Condition.objects.all()

class FileView(viewsets.ModelViewSet):
    serializer_class = FileSerializer
    queryset = File.objects.all()

class GenderView(viewsets.ModelViewSet):
    serializer_class = GenderSerializer
    queryset = Gender.objects.all()

class SizeView(viewsets.ModelViewSet):
    serializer_class = SizeSerializer
    queryset = Size.objects.all()