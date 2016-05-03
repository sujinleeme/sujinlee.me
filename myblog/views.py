from django.shortcuts import render
from django.utils import timezone
from .models import Post, Project, Category
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'blog/index.html')

def about(request):
    return render(request, 'blog/about.html')

#blog
def post_list(request):
    posts = Post.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'blog/post_list.html', {'posts':posts})

def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)
    try:
        next = post.get_next_by_published_date()
    except Post.DoesNotExist:
        next = None
    try:
        previous = post.get_previous_by_published_date()
    except Post.DoesNotExist:
        previous = None
    context = {'post':post,'next':next,'previous':previous}
    return render(request,'blog/post_detail.html', context)

# project
def project_list(request):
    projects = Project.objects.filter(published_date__lte=timezone.now()).order_by('published_date')
    return render(request, 'blog/project_list.html', {'projects':projects})

def project_detail(request, slug):
    project = get_object_or_404(Project, slug=slug)
    try:
        next = project.get_next_by_published_date()
    except Project.DoesNotExist:
        next = None
    try:
        previous = project.get_previous_by_published_date()
    except Project.DoesNotExist:
        previous = None
    context = {'project':project,'next':next,'previous':previous}
    return render(request,'blog/project_detail.html', context)

#Likes
def like_count_blog(request):
    if request.method == 'GET':
        post_id = request.GET['post_id']

    if post_id:
        post = Post.objects.get(id=int(post_id))
        if post:
            likes = post.likes + 1
        else:
            likes = post.likes
        post.likes = likes
        post.save()
    return HttpResponse(likes)


def like_count_project(request):
    if request.method == 'GET':
        project_id = request.GET['project_id']

    if project_id:
        project = Project.objects.get(id=int(project_id))
        if project:
            if request.session.get('has_liked_'+project_id, False):
                print("already liked")
                if not project.likes < 1:
                    likes = project.likes - 1
                    try:
                        del request.session['has_liked_'+project_id]
                    except KeyError:
                        print("keyerror")
                else:
                    likes = 0
            else:
                print("new like")
                request.session['has_liked_'+project_id] = True
                likes = project.likes + 1
        else:
            likes = 0
        project.likes = likes
        project.save()
    return HttpResponse(likes)
