from django.db import models

class Post(models.Model):
    user_uid = models.CharField(max_length=128, blank=True, null=True)
    username = models.CharField(max_length=128)
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_datetime = models.DateTimeField(auto_now_add=True)
    liked_uids = models.JSONField(default=list, blank=True)