from rest_framework.permissions import BasePermission
from firebase_admin import auth as firebase_auth

class IsFirebaseAuthenticated(BasePermission):
    def has_permission(self, request, view):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return False
        token = auth_header.split(' ')[1]
        try:
            decoded_token = firebase_auth.verify_id_token(token)
            request.firebase_user = decoded_token
            return True
        except Exception as e:
            print("Firebase auth error:", e)
            return False
