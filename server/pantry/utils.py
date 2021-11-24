from django.conf import settings
from rest_framework.views import exception_handler
from .models import Category, Clothes, Color, Condition, Gender, Size
from .serializers import ClothesSerializer

from PIL import Image as PILImage

from datetime import date

import openpyxl

def refuel_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Update the structure of the response data.
    if response is not None:
        customized_response = {}
        customized_response['errors'] = []
        customized_response['status_code'] = response.status_code

        for key, value in response.data.items():
            error = {'field': key.title(), 'message': value}
            customized_response['errors'].append(error)

        response.data = customized_response

    return response

def import_clothes(import_file):
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

    clothes = []
    row_num = 0
    for row in worksheet.iter_rows(min_row=2):

        if (str(row[0].value) != 'None'):
            """Handle image"""
            img = PILImage.open(worksheet._images[row_num].ref)
            img_value = '/img/clothes' + str(row_num) + '.jpg'
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
            data = ClothesSerializer(instance=obj).data
            clothes.append(data)

            row_num = row_num + 1
    return clothes