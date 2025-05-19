from django.urls import path
from .views import PostListCreate, PostDetail

urlpatterns = [
    path('', PostListCreate.as_view()),
    path('<int:pk>/', PostDetail.as_view()),
]
