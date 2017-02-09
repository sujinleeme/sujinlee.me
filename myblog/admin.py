from django.contrib import admin
from .models import Post, Category, Project
from django_markdown.admin import AdminMarkdownWidget

class PostAdmin(admin.ModelAdmin):
    formfield_overrides = {'body': {'widget': AdminMarkdownWidget}}

class ProjectAdmin(admin.ModelAdmin):
    formfield_overrides = {'body': {'widget': AdminMarkdownWidget}}

admin.site.register(Post,PostAdmin)
admin.site.register(Project,ProjectAdmin)
admin.site.register(Category)
