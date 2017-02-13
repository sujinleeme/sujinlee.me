from django.conf.urls import url, include
import django.views.defaults
from . import views

handler404 = 'views.custom_404'

urlpatterns = [
    #home
    url(r'^$', views.index, name='index'),
    
    #markdownx
    url('^markdown/', include( 'django_markdown.urls')),

    #project
    url(r'^project/$', views.project_list, name='project_list'),
    url(r'^project/(?P<slug>[-_\w]*)/$', views.project_detail, name='project_detail'),

    #blog
    url(r'^blog/$', views.post_list, name='post_list'),
    url(r'^blog/(?P<slug>(?!new)[-_\w]*)/$', views.post_detail, name='post_detail'),
    # url(r'^blog/(?P<slug>(?!new)[-_\w]*)/edit$', views.CreatePost.as_view(), name='post_new'),
    url(r'^blog/new/$', views.post_create, name='post_new'),

    #about
    url(r'^about/$', views.about, name='about'),
    
    #likes 
    url(r'^like_count_blog/$', views.like_count_blog, name='like_count_blog'),
    url(r'^like_count_project/$', views.like_count_project, name='like_count_project'),

    #tag
    url(r'^tag/$', views.TagTV.as_view(), name='tag_cloud'),
    url(r'^tag/(?P<tag>[^/]+(?u))/$', views.PostTOL.as_view(), name='tagged_object_list'),

    #404 error
    url(r'^404/$', django.views.defaults.page_not_found, name="custom_404"),


    
]
