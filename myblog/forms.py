from django import forms
from django.forms import CharField
from django.core import validators

from .models import Post
from django_markdown.fields import MarkdownFormField
from simplemde.fields import SimpleMDEField

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['category', 'published_date', 'image', 'title', 'summary', 'body', 'tag', 'slug']
        slug = forms.CharField(validators=[validators.validate_slug])

        widgets = {
            'title' : forms.TextInput(attrs = {'placeholder': 'title'}),
            'summary'    : forms.TextInput(attrs = {'placeholder': 'subtitle'}),
            'published_date'    : forms.DateInput(attrs={'type': 'date'}),
            'tag'    : forms.TextInput(attrs = {'placeholder': 'tag'}),
            'slug'    : forms.TextInput(attrs = {'placeholder': 'url'}),
        }

        
        