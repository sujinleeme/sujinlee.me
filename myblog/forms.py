from django import forms
from django.forms import CharField
from django.core import validators

from .models import Post
from django_markdown.fields import MarkdownFormField

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['category', 'image', 'title', 'summary', 'body', 'tag', 'slug']
        slug = forms.CharField(validators=[validators.validate_slug])
        
        widgets = {
            'title' : forms.TextInput(attrs = {'placeholder': 'title'}),
            'summary'    : forms.TextInput(attrs = {'placeholder': 'subtitle'}),
            # 'body'    : forms.TextAreaInput(attrs = {'placeholder': 'body'}),
            'tag'    : forms.TextInput(attrs = {'placeholder': 'tag'}),
            'slug'    : forms.TextInput(attrs = {'placeholder': 'url'}),
        }
        