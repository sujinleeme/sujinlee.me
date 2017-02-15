from django import forms
from .models import Post
from django_markdown.fields import MarkdownFormField
from django_markdown.widgets import MarkdownWidget

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('category', 'image', 'title', 'summary', 'body', 'tag', 'slug')
        content = forms.CharField(widget=MarkdownWidget())
        #field.field.widget.attrs.update({ "placeholder": args })
       
        widgets = {
            'title' : forms.TextInput(attrs = {'placeholder': 'title'}),
            'summary'    : forms.TextInput(attrs = {'placeholder': 'subtitle'}),
            'body'    : forms.TextInput(attrs = {'placeholder': 'body'}),
            'tag'    : forms.TextInput(attrs = {'placeholder': 'tag'}),
            'slug'    : forms.TextInput(attrs = {'placeholder': 'slug'}),
        }
        
