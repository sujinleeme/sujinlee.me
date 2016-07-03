# title : crawling event data in pathetic old Korean marathon website
# website : http://www.roadrun.co.kr/schedule/
# Korean : 마라톤 웹사이트 이벤트(2016부터) 데이터 크롤링

# -*- coding: utf-8 -*-
import re
import datetime
import requests
import urllib.request
from bs4 import BeautifulSoup

today = datetime.datetime.now()
print('Working Date : {}'.format(today))

def count_annual_event():
    read = requests.get("http://www.roadrun.co.kr/schedule/list.php?today=1451574000&todays=Y")
    soup = BeautifulSoup(read.content, 'html.parser')
    table = soup.find('body').find_all('table')[6:7]
    trs = [tr.find_all('table')[3] for tr in table][0].find_all('tr')
    total = len(trs[::2])
    print("Ready to crawl {} marathon events since 2016.".format(total))
    return(total)

def extract_event_data(url):
    content = urllib.request.urlopen(str(url))
    soup = BeautifulSoup(content.read().decode('euc-kr', 'ignore'), 'html.parser')
    table = soup.find_all('table')[1]
    info = [s.strip() for s in table.text.splitlines() if s]
    info = list(filter(None, info))[1::2]
    #join description
    info[11:len(info)] = [' '.join(info[11:len(info)])]
    print(info)
    return(info)

def all_events(start):
    #store all data in empty list
    all_data = []
    total = int(count_annual_event())
    #get final URL query
    end = int(start) + total
    print("Collecting data... wait for a second.")
    try:
        for i in range(start, end):
            url = 'http://www.roadrun.co.kr/schedule/view.php?no={}'.format(i)
            new_data = extract_event_data(url) #values
            if len(new_data) != 9:
                all_data.append(new_data)
        print("Merge all events data...")
    except:
        print("Fail to read contents")
    print("{} events are empty.".format(total-len(all_data)))
    return(data_formatting(all_data))

def data_formatting(data):
    keys = ['title', 'host', 'email', 'date', 'phone', 'race', 'city',
            'location', 'host', 'application_period', 'website', 'description']

    str_keys = ['대회명', '대표자명', 'E-mail', '대회일시', '전화번호', '대회종목',
                '대회지역', '대회장소', '주최단체', '접수기간', '홈페이지', '기타소개']

    #formatted date string:
    for i in range(len(data)):
        #remove empty data string
        data[i] = [x.replace(x, '.') if x in str_keys else x for x in data[i]]
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
        #data[i][9] = '{}/{}/{} - {}/{}/{}'.format(*(re.findall('\d+', data[i][9])))
        data[i] = dict(zip(keys, data[i]))
    data = sorted(data, key=lambda k: k['date'], reverse=True)
    print('Data formatting...')
    return(data)

# read evevnt data since first event in 2016
# link: http://www.roadrun.co.kr/schedule/view.php?no=6198
all_data = (all_events(6198))
print("Ready to save {} events in file".format(len(all_data)))
# save output in event_data.py
with open("event_data.py", "w") as f:
    try:
        f.write('# -*- coding: utf-8 -*-\nevent_data={}'.format(str(all_data)))
        print("Updated all data successfully!")
    except:
        print("Error processing")
