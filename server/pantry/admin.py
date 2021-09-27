from django.contrib import admin
from .models import Category, Clothes, Color, Condition, File, Gender, Size

class GenericModelAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')

class SizeAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'is_active')

# Register your models here.

admin.site.register(Category, GenericModelAdmin)
admin.site.register(Clothes, admin.ModelAdmin)
admin.site.register(Color, GenericModelAdmin)
admin.site.register(Condition, GenericModelAdmin)
admin.site.register(Gender, GenericModelAdmin)
admin.site.register(Size, SizeAdmin)
