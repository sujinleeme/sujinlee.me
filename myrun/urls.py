from django.conf.urls import url, include
from . import views
urlpatterns = [
  url(r'^runkorea/$', views.event_list, name='event_list'),
]
