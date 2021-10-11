from django.contrib.auth import authenticate
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.forms.models import model_to_dict
from django.conf import settings
from rest_framework import viewsets, permissions, generics
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, DjangoModelPermissions
from rest_framework.serializers import Serializer
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)
from rest_framework.response import Response
from django.contrib.auth.models import User, Group, Permission
from .serializers import CategorySerializer, ClothesSerializer, ColorSerializer, ConditionSerializer, FileSerializer, GenderSerializer, GroupSerializer, PermissionSerializer, SchoolSerializer, SizeSerializer, UserSerializer, VerseSerializer
from .models import Category, Clothes, Color, Condition, File, Gender, Size, Verse

from datetime import datetime

import math
import random

# Create your views here.

@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({'error': 'Please provide both username and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    user.last_login = datetime.now()
    user.save()
    token, _ = Token.objects.get_or_create(user=user)
    """dict_groups = []
    
    for g_name in user.groups.all():
        group = Group.objects.get(name=g_name)
        for item in group:
            item['name'] = model_to_dict(item['name'])
        dict_groups += model_to_dict(group)
    
    user.groups_details = dict_groups"""

    response = JsonResponse(UserSerializer(instance=user).data)
    response.set_cookie('token', token.key, httponly=True, secure=True, samesite='strict')
    response.set_cookie('logged_in', True, httponly=False, secure=True, samesite='strict')
    
    return response

@api_view(["POST"])
def logout(request):
    token = request.COOKIES.get("token")
    if token is None:
        return Response({'error': 'No user is logged in'},
                        status=HTTP_400_BAD_REQUEST)
    token = Token.objects.get(key=token)
    if not token:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)

    response = HttpResponse({'success': 'User has logged out!'})
    response.delete_cookie('token')
    response.delete_cookie('logged_in')
    
    return response

@api_view(["GET"])
@permission_classes([AllowAny,])
def verseoftheday(request):
    verses = Verse.objects.values('verse', 'passage')
    length = len(verses)

    if length == 0:
        data = dict(verse='N/A', passage='No verses in memory.')
    else:
        index = math.floor(random.random() * length)
        verseoftheday = verses[index]
        data = VerseSerializer(instance=verseoftheday).data

    return JsonResponse(data)    

class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [DjangoModelPermissions]

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [DjangoModelPermissions]

class ClothesList(generics.ListCreateAPIView):
    serializer_class = ClothesSerializer
    queryset = Clothes.objects.all()
    permission_classes = [DjangoModelPermissions]

class ClothesDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClothesSerializer
    queryset = Clothes.objects.all()
    permission_classes = [DjangoModelPermissions]

class ColorList(generics.ListCreateAPIView):
    serializer_class = ColorSerializer
    queryset = Color.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.DATA)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class ColorDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ColorSerializer
    queryset = Color.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.DATA)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return super().put(request, *args, **kwargs)

class ConditionList(generics.ListCreateAPIView):
    serializer_class = ConditionSerializer
    queryset = Condition.objects.all()
    permission_classes = [DjangoModelPermissions]

class ConditionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ConditionSerializer
    queryset = Condition.objects.all()
    permission_classes = [DjangoModelPermissions]

class FileList(generics.ListCreateAPIView):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    permission_classes = [DjangoModelPermissions]

class FileDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    permission_classes = [DjangoModelPermissions]

class GenderList(generics.ListCreateAPIView):
    serializer_class = GenderSerializer
    queryset = Gender.objects.all()
    permission_classes = [DjangoModelPermissions]

class GenderDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GenderSerializer
    queryset = Gender.objects.all()
    permission_classes = [DjangoModelPermissions]

class GroupList(generics.ListCreateAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [DjangoModelPermissions]

class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [DjangoModelPermissions]

class PermissionList(generics.ListCreateAPIView):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    permission_classes = [DjangoModelPermissions]

class PermissionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    permission_classes = [DjangoModelPermissions]

class SchoolList(generics.ListCreateAPIView):
    serializer_class = SchoolSerializer
    queryset = Size.objects.all()
    permission_classes = [DjangoModelPermissions]

class SchoolDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SchoolSerializer
    queryset = Size.objects.all()
    permission_classes = [DjangoModelPermissions]

class SizeList(generics.ListCreateAPIView):
    serializer_class = SizeSerializer
    queryset = Size.objects.all()
    permission_classes = [DjangoModelPermissions]

class SizeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SizeSerializer
    queryset = Size.objects.all()
    permission_classes = [DjangoModelPermissions]

class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [DjangoModelPermissions]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [DjangoModelPermissions]

class VerseList(generics.ListCreateAPIView):
    serializer_class = VerseSerializer
    queryset = Verse.objects.all()
    permission_classes = [DjangoModelPermissions]

class VerseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VerseSerializer
    queryset = Verse.objects.all()
    permission_classes = [DjangoModelPermissions]