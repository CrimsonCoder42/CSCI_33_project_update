
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("personal_profile/<str:username>", views.user_profile, name="personal_profile"),


    #API URLS
    path("post", views.create_post, name="create_post"),
    path("profile/<str:user>", views.profiles, name="profiles")

]
