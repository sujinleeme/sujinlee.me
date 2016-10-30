from django.conf.urls import url, include
import django.views.defaults
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    #page
    url(r'^project/(?P<slug>[-_\w]*)/$',views.project_detail, name='project_detail'),
    url(r'^project/$', views.project_list, name='project_list'),
    url(r'^blog/(?P<slug>[-_\w]*)/$',views.post_detail, name='post_detail'),
    url(r'^blog/$', views.post_list, name='post_list'),
    url(r'^blog/new/$', views.post_new, name='post_new'),
    url(r'^about/$', views.about, name='about'),

    #likes 
    url(r'^like-blog/$', views.like_count_blog, name='like_count_blog'),
    url(r'^like-project/$', views.like_count_project, name='like_count_project'),

    #tag
    url(r'^tag/$', views.TagTV.as_view(), name='tag_cloud'),
    url(r'^tag/(?P<tag>[^/]+(?u))/$', views.PostTOL.as_view(), name='tagged_object_list'),

    #404 error
    url(r'^404/$', django.views.defaults.page_not_found, ),
    
]
