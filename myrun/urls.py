from django.conf.urls import url, include
from . import views
urlpatterns = [
  url(r'^marathon-event/$', views.event_list, name='event_list'),
]
