from rest_framework.permissions import BasePermission, SAFE_METHODS
from django.contrib.auth.models import User

class IsAdministrator(BasePermission):
    message = "Only Administrators may access this resource."

    def has_permission(self, request, view):
        if "Administrator" in request.user.groups.all() or request.user.is_superuser:
            return True
        
        return False

class IsAdministratorOrReadonly(BasePermission):
    message = "Only Administrators may edit this resource."

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif "Administrator" in request.user.groups.all() or request.user.is_superuser:
            return True
        
        return False

class IsModerator(BasePermission):
    message = "Only Moderators may access this resource."

    def has_permission(self, request, view):
        if ("Administrator" in request.user.groups.all() or request.user.is_superuser) or ("Moderator" in request.user.groups.all() or request.user.is_staff):
            return True
        
        return False

class IsModeratorOrReadonly(BasePermission):
    message = "Only Moderators may edit this resource."

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif ("Administrator" in request.user.groups.all() or request.user.is_superuser) or ("Moderator" in request.user.groups.all() or request.user.is_staff):
            return True
        
        return False

class IsPatron(BasePermission):
    message = "Only Patrons may access this resource."

    def has_permission(self, request, view):
        if ("Administrator" in request.user.groups.all() or request.user.is_superuser) or ("Moderator" in request.user.groups.all() or request.user.is_staff) or ("Patron" in request.user.groups.all()):
            return True
        
        return False

class IsPatronOrReadonly(BasePermission):
    message = "Only Patrons may edit this resource."

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        elif ("Administrator" in request.user.groups.all() or request.user.is_superuser) or ("Moderator" in request.user.groups.all() or request.user.is_staff) or ("Administrator" in request.user.groups.all() or request.user.is_superuser) or ("Moderator" in request.user.groups.all() or request.user.is_staff) or ("Patron" in request.user.groups.all()):
            return True
        
        return False

class ModelOwnerOnly(BasePermission):
    message = "Only the owner of this model may edit this resource."

    def has_object_permission(self, request, view, obj):
        try:
            if type(obj) is User:
                if request.user.id is obj.id:
                    return True
            elif request.user.id is obj.user.id: # assumes obj has "user" attribute
                return True
        except BaseException as err:
            return False # if an error occurs, fail silently and assume permission is denied
        
        return False