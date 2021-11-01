from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

urlpatterns = [
    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),
    path('clothes/', views.ClothesList.as_view()),
    path('clothes/<int:pk>/', views.ClothesDetail.as_view()),
    path('colors/', views.ColorList.as_view()),
    path('colors/<int:pk>/', views.ColorDetail.as_view()),
    path('conditions/', views.ConditionList.as_view()),
    path('conditions/<int:pk>/', views.ConditionDetail.as_view()),
    path('files/', views.FileList.as_view()),
    path('files/<int:pk>/', views.FileDetail.as_view()),
    path('genders/', views.GenderList.as_view()),
    path('genders/<int:pk>/', views.GenderDetail.as_view()),
    path('groups/', views.GroupList.as_view()),
    path('groups/<int:pk>/', views.GroupDetail.as_view()),
    path('permissions/', views.PermissionList.as_view()),
    path('permissions/<int:pk>/', views.PermissionDetail.as_view()),
    path('schools/', views.SchoolList.as_view()),
    path('schools/<int:pk>/', views.SchoolDetail.as_view()),
    path('sizes/', views.SizeList.as_view()),
    path('sizes/<int:pk>/', views.SizeDetail.as_view()),
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserDetail.as_view()),
    path('verses/', views.VerseList.as_view()),
    path('verses/<int:pk>/', views.VerseDetail.as_view()),
    path('login/', views.refuellogin),
    path('logout/', views.refuellogout),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('verseoftheday/', views.verseoftheday),
]

urlpatterns = format_suffix_patterns(urlpatterns)

