from django import forms
from .models import Post
from django_markdown.fields import MarkdownFormField
from django_markdown.widgets import MarkdownWidget

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('category', 'image', 'title', 'summary', 'body', 'tag', 'slug')
        content = forms.CharField(widget=MarkdownWidget())
        content2 = MarkdownFormField()
