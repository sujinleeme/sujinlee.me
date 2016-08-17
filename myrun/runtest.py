# title : crawling event data in pathetic old Korean marathon website
# website : http://www.roadrun.co.kr/schedule/
# Korean : 마라톤 웹사이트 이벤트(2016부터) 데이터 크롤링

# -*- coding: utf-8 -*-
import re
import datetime
import requests
import json
import forecastio
import urllib.request
import codecs
from bs4 import BeautifulSoup

today = datetime.datetime.now()
print('Working Date : {}'.format(today))

# count total annual event
def count_annual_event():
    read = requests.get("http://www.roadrun.co.kr/schedule/list.php?today=1451574000&todays=Y")
    soup = BeautifulSoup(read.content, 'html.parser')
    try:
        table = soup.find('body').find_all('table')[9:10]
        trs = [tr for tr in table][0].find_all('tr')
        total = int(len(trs)/2)
        print("Ready to crawl {} marathon events since 2016.".format(total))
    except:
        print("Can't crawl data from website.")
    return(total)

# extract raw event data from original website
# -- 'title', 'host', 'email', 'date', 'phone', 'race', 'city', 'location', 'host', 'application_period', 'website', 'description'
def extract_event_data(url):
    content = urllib.request.urlopen(str(url))
    soup = BeautifulSoup(content.read().decode('euc-kr', 'ignore'), 'html.parser')
    table = soup.find_all('table')[1]
    info = [s.strip() for s in table.text.splitlines() if s]
    info = list(filter(None, info))[1::2]
    #join description
    info[11:len(info)] = [' '.join(info[11:len(info)])]
    print("Ready to save {} events in file".format(len(all_data)))
    return(info)

#
def all_events(start):
    #store all data in empty list
    all_data = []
    total = int(count_annual_event())
    #get final URL query
    end = int(start) + total
    print(end)
    print("Collecting data... wait for a second.")
    try:
        for i in range(start, end):
            url = 'http://www.roadrun.co.kr/schedule/view.php?no={}'.format(i)
            new_data = extract_event_data(url)
            print(new_data)#values
            if len(new_data) != 9:
                all_data.append(new_data)
                print(new_data)
        print("Merge all events data...")
    except:
        pass
    #    print("Fail to read contents")
    #print("{} events are empty.".format(total-len(all_data)))
    return(data_formatting(all_data))

# with open("event_data.py", "w") as f:
#     try:
#         f.write('# -*- coding: utf-8 -*-\nevent_data={}'.format(str(all_data)))
#         print("Updated all data successfully!")
#     except:
#         print("Error processing")


def data_formatting(data):
    keys = ['title', 'host', 'email', 'date', 'phone', 'race', 'city',
            'location', 'host', 'application_period', 'website', 'description',
            'latitude', 'longtitude', 'map_url', 'weather']

    #str_keys = ['대회명', '대표자명', 'E-mail', '대회일시', '전화번호', '대회종목',
    #            '대회지역', '대회장소', '주최단체', '접수기간', '홈페이지', '기타소개']

    #formatted date string:
    for i in range(len(data)):
        #remove empty data string
        data[i] = [x.replace(x, '.') if x in keys else x for x in data[i]]
        # formatted 'date'
        date = list(map(int, re.findall('\d+', data[i][3])))
        # wrong user input
        # covert 12 hour to 24 hour
        if '오후' in data[i][3]:
            date[3] += 12
        # wrong user input (1000 hour)
        date = [10 if x==1000 else x for x in date]
        data[i][3] = datetime.datetime(*date).strftime("%Y/%m/%d %H:%M")

        # formatted 'application_period'
        try:
            data[i][9] = '{}/{}/{} - {}/{}/{}'.format(*(re.findall('\d+', data[i][9])))
        except IndexError:
            print("Found unexpected 'application_period' type. But it will be ignored.")
            pass

        # location
        location = re.sub(',', ' ', data[i][7])
        #get map data
        geocode = get_map(location)
        #get weather data
        weather = get_weather(geocode[0], geocode[1], date)
        data[i] = [*data[i], *geocode, weather]
        data[i] = dict(zip(keys, data[i]))
    #data = sorted(data, key=lambda k: k['date'], reverse=True)
    print('Data formatting...')
    return(data)

def get_map(place):
    baseUrl = 'https://apis.daum.net/local/v1/search/keyword.json'
    params = {'apikey':'317394cebdea4b6359a849bcf994be38', 'sort':1, 'query':place}
    content = requests.get(baseUrl, params=params).json()
    mapData = content['channel']['item']
    try:
        if len(mapData) == 0: #can't search place
            place = ' '.join(place.split()[:-1])
            return (get_map(place))
        else:
            mapData = mapData[0]
            result = [mapData['latitude'], mapData['longitude'], 'http://map.daum.net/link/map/{}'.format(mapData['id'])]
            return (result)
    except KeyError:
        result = ['none', 'none', 'none']
        return (result)

def get_weather(latitude, longitude, date):
    apikey = "6df93a29e9e01749131071518afe72ff"
    if longitude == 'none' or latitude == 'none':
        result = 'none'
    else:
        formatted_date = datetime.datetime(*date)
        try:
            forecast = forecastio.load_forecast(apikey, latitude, longitude, time=formatted_date)
            weather = forecast.currently()
            result = ('{}°C {}'.format(weather.temperature, weather.icon))
        except:
            result = 'none'
    return (result)

    #except KeyError:

    #    return(get_result)

# read evevnt data since first event in 2016
# link: http://www.roadrun.co.kr/schedule/view.php?no=6198


# save output in event_data.py
all_data = (all_events(6198))

fhand = codecs.open('event_data.py', mode='w', encoding='utf-8')
count=0
fhand.write("# -*- coding: utf-8 -*-\nevent_data={\n")
for data in all_data:
    try :
        count = count + 1
        if count > 1 : fhand.write(",\n")
        output = data
        fhand.write(output)
        print("Save all data successfully")
    except:
        continue
        print("Error processing")
fhand.write("\n}\n")
fhand.close()

# save output in event_data.py


#fhand = codecs.open('event_data.py', mode='w', encoding='utf-8')
#    fhand.write("# -*- coding: utf-8 -*-\nevent_data={\n")
# #    count=0
# with open("event_data.py", "w") as f:
#     try:
#         f.write('# -*- coding: utf-8 -*-\nevent_data={}'.format(str(all_data)))
#         print("Updated all data successfully!")
#     except:
#         print("Error processing")
