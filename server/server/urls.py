"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from pantry import views

router = routers.DefaultRouter()
router.register(r'categories', views.CategoryView, 'category')
router.register(r'clothes', views.ClothesView, 'clothes')
router.register(r'colors', views.ColorView, 'color')
router.register(r'conditions', views.ConditionView, 'condition')
router.register(r'files', views.FileView, 'file')
router.register(r'genders', views.GenderView, 'gender')
router.register(r'sizes', views.SizeView, 'size')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
