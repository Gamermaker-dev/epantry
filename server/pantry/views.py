from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.db import transaction
from django.http import JsonResponse, HttpResponse
from rest_framework import generics
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, DjangoModelPermissions
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND
)
from rest_framework.response import Response
from django.contrib.auth.models import User, Group, Permission
from .serializers import CategorySerializer, ClothesSerializer, ColorSerializer, ConditionSerializer, FileSerializer, GenderSerializer, GroupSerializer, PermissionSerializer, SchoolSerializer, SizeSerializer, UserSerializer, VerseSerializer
from .models import Category, Clothes, Color, Condition, File, Gender, Size, Verse
from .permissions import IsAdministrator, IsAdministratorOrReadonly, IsModerator, IsModeratorOrReadonly, IsPatron, IsPatronOrReadonly, ModelOwnerOnly
from .utils import import_clothes

from datetime import datetime

import math
import random

# Create your views here.

@api_view(["POST"])
@permission_classes((AllowAny,))
def refuellogin(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        error = {'errors': [{'field': 'login', 'message': ['Please provide both username and password']}]}
        return Response(data=error,
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        error = {'errors': [{'field': 'authentication', 'message': ['Invalid Credentials']}]}
        return Response(data=error,
                        status=HTTP_404_NOT_FOUND)
    login(request, user)
    user.last_login = datetime.now()
    user.save()
    token, _ = Token.objects.get_or_create(user=user)

    send_mail('New Login', f'{user.first_name} {user.last_name} has just logged in!', 'foo@foobar.com', ['to@foobar.com'], fail_silently=True)

    response = JsonResponse(UserSerializer(instance=user).data)
    response.set_cookie('token', token.key, httponly=True, secure=True, samesite='strict')
    response.set_cookie('logged_in', True, httponly=False, secure=True, samesite='strict')
    
    return response

@api_view(["POST"])
def refuellogout(request):
    token = request.COOKIES.get("token")
    if token is None:
        error = {'errors': [{'field': 'logout', 'message': ['No user is logged in.']}]}
        return Response(data=error,
                        status=HTTP_400_BAD_REQUEST)
    token = Token.objects.get(key=token)
    if not token:
        error = {'errors': [{'field': 'token', 'message': ['Invalid token.']}]}
        return Response(data=error,
                        status=HTTP_404_NOT_FOUND)

    logout(request)
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

@api_view(["POST"])
@permission_classes([IsModerator,])
@transaction.atomic
def importclothes(request):
    """View for importing an excel sheet full of clothes."""

    import_file = request.FILES["import_file"]
    clothes = {}

    try:
        clothes = import_clothes(import_file)
    except BaseException as err:
        raise err
    
    return JsonResponse(clothes, safe=False)

@api_view(["GET"])
@permission_classes([IsModerator, ModelOwnerOnly])
def getcart(request):
    """View for retrieving user's cart"""

    cart = Clothes.objects.filter(user=request.user, date_checked_out__isnull=True)
    cart = ClothesSerializer(instance=cart).data

    return JsonResponse(cart)

class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class ClothesList(generics.ListCreateAPIView):
    serializer_class = ClothesSerializer
    queryset = Clothes.objects.all()
    permission_classes = [DjangoModelPermissions]

    def get_queryset(self):
        if self.request.query_params:
            category = self.request.query_params.get('category')
            size = self.request.query_params.get('size')
            gender = self.request.query_params.get('gender')
            condition = self.request.query_params.get('condition')
            color = self.request.query_params.get('color')
            order_by = self.request.query_params.get('order_by')

            queryset = Clothes.objects.filter(category=category, size=size, gender=gender, condition=condition, color=color).order_by(order_by)

            return queryset
        
        return super().get_queryset()
    

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class ClothesDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClothesSerializer
    queryset = Clothes.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class ColorList(generics.ListCreateAPIView):
    serializer_class = ColorSerializer
    queryset = Color.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class ColorDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ColorSerializer
    queryset = Color.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return super().put(request, *args, **kwargs)

class ConditionList(generics.ListCreateAPIView):
    serializer_class = ConditionSerializer
    queryset = Condition.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class ConditionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ConditionSerializer
    queryset = Condition.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class FileList(generics.ListCreateAPIView):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class FileDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FileSerializer
    queryset = File.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class GenderList(generics.ListCreateAPIView):
    serializer_class = GenderSerializer
    queryset = Gender.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class GenderDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GenderSerializer
    queryset = Gender.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class GroupList(generics.ListCreateAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class GroupDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = GroupSerializer
    queryset = Group.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class PermissionList(generics.ListCreateAPIView):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class PermissionDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = PermissionSerializer
    queryset = Permission.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class SchoolList(generics.ListCreateAPIView):
    serializer_class = SchoolSerializer
    queryset = Size.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class SchoolDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SchoolSerializer
    queryset = Size.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class SizeList(generics.ListCreateAPIView):
    serializer_class = SizeSerializer
    queryset = Size.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class SizeDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SizeSerializer
    queryset = Size.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class VerseList(generics.ListCreateAPIView):
    serializer_class = VerseSerializer
    queryset = Verse.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)

class VerseDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = VerseSerializer
    queryset = Verse.objects.all()
    permission_classes = [DjangoModelPermissions]

    def put(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=False):
            return JsonResponse(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        return super().put(request, *args, **kwargs)