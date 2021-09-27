from django.db import models
from datetime import date

from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    """Model representing a category for the clothing."""
    name = models.CharField(max_length=50, help_text="Enter the name of the category",)
    is_active = models.BooleanField(help_text="Is this category still in use? (Affects if it appears in the new Clothes form)",)

    def __str__(self):
        """String for representing the Model object."""
        return self.name

class Clothes(models.Model):
    """Model representing an item of clothes"""
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True,)
    size = models.ForeignKey('Size', on_delete=models.SET_NULL, null=True, blank=True,)
    gender = models.ForeignKey('Gender', on_delete=models.SET_NULL, null=True, blank=True,)
    color = models.ForeignKey('Color', on_delete=models.SET_NULL, null=True, blank=True,)
    condition = models.ForeignKey('Condition', on_delete=models.SET_NULL, null=True, blank=True,)
    image = models.ImageField(upload_to='images',)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    file = models.ForeignKey('File', on_delete=models.SET_NULL, null=True, blank=True)
    brand = models.CharField(max_length=50, help_text="Brand of clothing, if available", null=True, blank=True)
    description = models.TextField(max_length=500, help_text="Brief description of clothing", null=True, blank=True)
    inventory_date = models.DateField(help_text="Date the item of clothing was added to the pantry", default=date.today)
    date_checked_out = models.DateField(help_text="Date the item of clothing was checked out", null=True, blank=True)

    def __str__(self):
        """String for representing the Model object"""
        return f'{self.category}-{self.gender}-{self.size}'

class Color(models.Model):
    name = models.CharField(max_length=20, help_text="Enter the name of the color",)
    is_active = models.BooleanField(help_text="Is this color still in use? (Affects if it appears in the new Clothes form)",)

    def __str__(self):
        """String for representing the Model object."""
        return self.name

class Condition(models.Model):
    name = models.CharField(max_length=50, help_text="Enter the name of the condition",)
    is_active = models.BooleanField(help_text="Is this condition still in use? (Affects if it appears in the new Clothes form)",)

    def __str__(self):
        """String for representing the Model object."""
        return self.name

class File(models.Model):
    filename = models.CharField(max_length=250,)
    date_imported = models.DateField(help_text="Date the file was imported", default=date.today)

    def __str__(self):
        """String for representing the Model object."""
        return f'{self.date_imported}_{self.filename}'

class Gender(models.Model):
    """Model representing a gender for the clothing."""
    name = models.CharField(max_length=20, help_text="Enter the name of the gender",)
    is_active = models.BooleanField(help_text="Is this gender still in use? (Affects if it appears in the new Clothes form)",)

    def __str__(self):
        """String for representing the Model object."""
        return self.name

class Size(models.Model):
    name = models.CharField(max_length=30, help_text="Enter the name of the size",)
    category = models.ForeignKey('Category', on_delete=models.CASCADE, help_text="Category that size relates to",)
    is_active = models.BooleanField(help_text="Is this size size in use? (Affects if it appears in the new Clothes form)",)

    def __str__(self):
        """String for representing the Model object."""
        return f'{self.category} - {self.name}'