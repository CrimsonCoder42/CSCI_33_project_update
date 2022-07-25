from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    pass


class Post(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="post_user")
    username = models.TextField(blank=True)
    body = models.TextField(blank=True)
    like_count = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.user.id,
            "username": self.username,
            "body": self.body,
            "like_count": self.like_count,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
        }


class Profile(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_profile")
    username= models.TextField(blank=True)
    user_bio= models.TextField(blank=True)
    following_count = models.IntegerField(default=0)
    followers_count = models.IntegerField(default=0)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "user_bio": self.username,
            "following_count": self.following_count,
            "followers_count": self.followers_count,
        }

class Follow(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_follows")
    username= models.TextField(blank=True)
    following = models.ManyToManyField("User", related_name="following_users")
    followers = models.ManyToManyField("User", related_name="followers_users")

class Likes(models.Model):
    liked_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='liked_post_user')
    user_liked = models.ManyToManyField(User, blank=True, related_name='user_liked_posts')

