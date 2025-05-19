from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user_uid', 'username', 'title', 'content', 'created_datetime', 'liked_uids', 'likes_count']

    def get_likes_count(self, obj):
        return len(obj.liked_uids)
