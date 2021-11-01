from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
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
from .permissions import IsAdministrator, IsAdministratorOrReadonly, IsModerator, IsModeratorOrReadonly, IsPatron, IsPatronOrReadonly, ModelOwnerOnly

from PIL import Image as PILImage

from datetime import datetime

import math
import random
import openpyxl

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
def importclothes(request):
    """View for importing an excel sheet full of clothes."""

    import_file = request.FILES["import_file"]

    wb = openpyxl.load_workbook(import_file)

    worksheet = wb["Sheet1"]

    """
    Structure of Excel

    A - Item Number
    B - Picture
    C - Category
    D - Gender
    E - Size
    F - Pants-Waist
    G - Pants-Length
    H - Brand
    I - Color
    J - Condition
    K - Description
    L - Inventory Date
    """

    row_num = 0
    for row in worksheet.iter_rows(min_row=2):

        if (str(row[0].value) != 'None'):
            """Handle image"""
            img = PILImage.open(worksheet._images[row_num].ref)
            img_value = '/images/image' + str(row_num) + '.jpg'
            img.save(settings.MEDIA_ROOT + img_value)
            img.close()

            """Check each field and create a new entry if one does not exist"""
            category_val = ''
            if str(row[2].value) != 'None':
                ctgs = Category.objects.filter(name=str(row[2].value))
                if len(ctgs) == 0:
                    ctg_obj = Category()
                    ctg_obj.name = str(row[2].value)
                    ctg_obj.is_active = True
                    ctg_obj.save()
                    category_val = ctg_obj
                else:
                    category_val = Category.objects.get(name=str(row[2].value))
            
            gender_val = ''
            if str(row[3].value) != 'None':
                gnd = Gender.objects.filter(name=str(row[3].value))
                if len(gnd) == 0:
                    gnd_obj = Gender()
                    gnd_obj.name = str(row[3].value)
                    gnd_obj.is_active = True
                    gnd_obj.save()
                    gender_val = gnd_obj
                else:
                    gender_val = Gender.objects.get(name=str(row[3].value))
            
            size_val = ''
            if str(row[4].value) != 'None':
                sz = Size.objects.filter(name=str(row[4].value))
                if len(sz) == 0:
                    sz_obj = Size()
                    sz_obj.name = str(row[4].value)
                    sz_obj.category = category_val
                    sz_obj.is_active = True
                    sz_obj.save()
                    size_val = sz_obj
                else:
                    size_val = Size.objects.get(name=str(row[4].value))
            
            color_val = ''
            if str(row[8].value) != 'None':
                clr = Color.objects.filter(name=str(row[8].value))
                if len(clr) == 0:
                    clr_obj = Color()
                    clr_obj.name = str(row[8].value)
                    clr_obj.is_active = True
                    clr_obj.save()
                    color_val = clr_obj
                else:
                    color_val = Color.objects.get(name=str(row[8].value))
            
            condition_val = ''
            if str(row[9].value) != 'None':
                cnd = Condition.objects.filter(name=str(row[9].value))
                if len(cnd) == 0:
                    cnd_obj = Condition()
                    cnd_obj.name = str(row[9].value)
                    cnd_obj.is_active = True
                    cnd_obj.save()
                    condition_val = cnd_obj
                else:
                    condition_val = Condition.objects.get(name=str(row[9].value))
            
            inventory_date = str(row[11].value).split()[0]
            if inventory_date == 'None':
                inventory_date = date.today().strftime('%Y-%m-%d')

            obj = Clothes()
            if str(row[0].value) != 'None':
                obj.item_number = row[0].value
            obj.image = img_value
            if category_val != '':
                obj.category = category_val
            if gender_val != '':
                obj.gender = gender_val
            if size_val != '':
                obj.size = size_val
            if str(row[7].value) != 'None':
                obj.brand = str(row[7].value)
            if color_val != '':
                obj.color = color_val
            if condition_val != '':
                obj.condition = condition_val
            obj.description = str(row[10].value)
            obj.inventory_date = inventory_date
            obj.save()

            row_num = row_num + 1
    
    return render(request, self.template_name)

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