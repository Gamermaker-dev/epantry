from django.shortcuts import render
from rest_framework import viewsets, permissions
from django.contrib.auth.models import User, Group
from .serializers import CategorySerializer, ClothesSerializer, ColorSerializer, ConditionSerializer, FileSerializer, GenderSerializer, GroupSerializer, SizeSerializer, UserSerializer
from .models import Category, Clothes, Color, Condition, File, Gender, Size

# Create your views here.
class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ClothesView(viewsets.ModelViewSet):
    serializer_class = ClothesSerializer
    queryset = Clothes.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ColorView(viewsets.ModelViewSet):
    serializer_class = ColorSerializer
    queryset = Color.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ConditionView(viewsets.ModelViewSet):
    serializer_class = ConditionSerializer
    queryset = Condition.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class FileView(viewsets.ModelViewSet):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class GenderView(viewsets.ModelViewSet):
    serializer_class = GenderSerializer
    queryset = Gender.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class GroupView(viewsets.ModelViewSet):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SizeView(viewsets.ModelViewSet):
    serializer_class = SizeSerializer
    queryset = Size.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]