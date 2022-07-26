import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Count
from django.core.paginator import Paginator

from .models import User, Post, Profile, Follow, Likes


def index(request):
    allposts = get_post_page(1)
    return render(request, "network/index.html", {
        "posts": allposts,
        "pages": "page"
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


#make a new profile at the same time as creating anew user
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        user_bio = request.POST["user_bio"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()

            newProfile = Profile(
                user=user,
                username=username,
                user_bio=user_bio
            )

            newProfile.save()

        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

# Get all profile information and follower info merge/update into one piece of data and send back as JSON response
@login_required
def profiles(request, user):

    get_profile = Profile.objects.get(username=user)

    get_follow = Follow.objects.filter(username=user).annotate(
        follower_count=Count("followers", distinct=True),
        following_count=Count("following", distinct=True)
    ).values()[0]

    get_profile.following_count = get_follow['following_count']
    get_profile.followers_count = get_follow['follower_count']

    get_profile.save()

    profile_data = Profile.objects.filter(username=user).values()[0]

    return JsonResponse(profile_data, status=200)


@csrf_exempt
@login_required
def create_post(request):
    print(request.user)
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    content = json.loads(request.body)
    newPost= Post(
            user=request.user,
            body=content["body"],
            username=request.user
        )

    newPost.save()

    return JsonResponse({"message": "saved successfully."}, status=201)


def get_post_page(id):
    postData = Post.objects.all().order_by('-timestamp')
    return Paginator(postData, 10).page(id)


def get_user_page(id, user):
    postData = Post.objects.filter(username=user).order_by('-timestamp')
    return Paginator(postData, 10).page(id)

@login_required
def user_profile(request, username):

    personal_posts = get_user_page(1, username)
    profile_info = Profile.objects.filter(username=username).values()[0]

    print(profile_info)


    # liked = []

    # isolate the liked posts.
    # for post in personal_posts:
    #     for i in post.liked_by.all():
    #         if request.user == i:
    #             liked.append(post.id)
    return render(request, "network/index.html", {
        "posts": personal_posts,
        "profile_info": profile_info
    })

