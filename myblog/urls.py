from django.conf.urls import url, include
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^project/(?P<slug>[-_\w]*)/$',views.project_detail, name='project_detail'),
    url(r'^project/$', views.project_list, name='project_list'),
    url(r'^blog/(?P<slug>[-_\w]*)/$',views.post_detail, name='post_detail'),
    url(r'^blog/$', views.post_list, name='post_list'),
    url(r'^about/$', views.about, name='about'),
    url(r'^like/$', views.like_count, name='like_count'),
]
