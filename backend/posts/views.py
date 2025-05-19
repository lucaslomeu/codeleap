from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from .permissions import IsFirebaseAuthenticated

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by('-created_datetime')
    serializer_class = PostSerializer

    @action(detail=True, methods=['post'], permission_classes=[IsFirebaseAuthenticated])
    def like(self, request, pk=None):
        post = self.get_object()
        user_uid = request.firebase_user['uid'] 
        if user_uid not in post.liked_uids:
            post.liked_uids.append(user_uid)
            post.save()
        return Response({'likes': len(post.liked_uids)})

    @action(detail=True, methods=['post'], permission_classes=[IsFirebaseAuthenticated])
    def unlike(self, request, pk=None):
        post = self.get_object()
        user_uid = request.firebase_user['uid']
        if user_uid in post.liked_uids:
            post.liked_uids.remove(user_uid)
            post.save()
        return Response({'likes': len(post.liked_uids)})
