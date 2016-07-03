from django.shortcuts import render
from django.utils import timezone
from datetime import date
import datetime
from . import event_data
# Create your views here.
def event_list(request):
    events = event_data.event_data
    count_total_events = len(events)
    today = date.today()
    now = datetime.datetime.now().strftime("%Y/%m/%d %H:%M")
    new_year = "2017/01/01 00:00"

    #upcoming events
    upcoming_events = list(reversed([e for e in events if now < e['date'] < new_year]))
    count_upcoming_events = len(upcoming_events)

    #past events
    past_events = events[count_upcoming_events:]
    past_events = events[count_upcoming_events+1:]
    count_past_events = len(past_events)

    #context
    context = {
    'events': events,
    'count_total_events': count_total_events,
    'upcoming_events': upcoming_events,
    'count_upcoming_events': count_upcoming_events,
    'past_events': past_events,
    'count_past_events': count_past_events,
    'today': today,
    }

    return render(request, 'marathon/event_list.html', context)
