from django.db import models
from django.utils import timezone
from django_markdown.models import MarkdownField
from tagging.fields import TagField
from imagekit.models import ImageSpecField
from imagekit.processors import ResizeToFill

import uuid

class Category(models.Model):
    title = models.CharField(max_length=50)
    image_url = models.CharField(max_length=100)
    color = models.CharField(max_length=50)
    
    def __str__(self):
        return (self.title)

class Post(models.Model):
    category = models.ForeignKey('Category')
    author = models.ForeignKey('auth.User')
    image = models.ImageField(upload_to='myblog/image/blog')
    image_thumbnail = ImageSpecField(source='image',
                                    processors=[ResizeToFill(100, 50)],
                                    format='JPEG',
                                    options={'quality': 60})
    title = models.CharField(max_length=200, verbose_name=u'Title')
    summary = models.CharField(max_length=1000)
    body =  MarkdownField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateField(default=timezone.now)
    slug = models.SlugField(unique=True)
    likes = models.PositiveIntegerField(default=0)
    tag = TagField()

    @property
    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title

    def publish(self):
        self.published_date = timezone.now()
        self.status == self.STATUS_PUBLIC
        self.save()

class Project(models.Model):
    category = models.ForeignKey('Category')
    author = models.ForeignKey('auth.User')
    image = models.ImageField(upload_to='myblog/image/project')
    image_thumbnail = ImageSpecField(source='image',
                                    processors=[ResizeToFill(100, 50)],
                                    format='JPEG',
                                    options={'quality': 60})
    title = models.CharField(max_length=200)
    summary = models.CharField(max_length=1000)
    body = MarkdownField()
    created_date = models.DateTimeField(default=timezone.now)
    published_date = models.DateField(default=timezone.now)
    slug = models.SlugField(unique=True)
    likes = models.PositiveIntegerField(default=0)

    @property
    def total_likes(self):
        return self.likes.count()

    def __str__(self):
        return self.title

    def publish(self):
        self.published_date = timezone.now()
        self.status == self.STATUS_PUBLIC
        self.save()

class About(models.Model):
    author = models.ForeignKey('auth.User')
    title = models.CharField(max_length=200)
    body = models.TextField()
    created_date = models.DateTimeField(
            default=timezone.now)
    published_date = models.DateTimeField(
            blank=True, null=True)

    def publish(self):
        self.published_date = timezone.now()
        self.save()

    def __str__(self):
        return self.title
