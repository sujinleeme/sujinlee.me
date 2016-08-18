# 2016 Marathon Schedule Web-Crawling 마라톤 일정 크롤링
[마라톤 온라인](http://www.marathon.pe.kr/schedule_index.html)이 제공하는 2016년간 행사 데이터를 크롤링한 웹페이지입니다.
I love running. In Korea, [Marathon Online] is the most famous marathon information website for over 15 years and all the runners use it. However, this site has old user interface design, and encoding problem.
For these reasons, I've decided revamp this website. For now, I can check weather, location as well as information and decide where I will go and enjoy event!

## Built With
* Django 1.9 
* [BeautifulSoup4](https://www.crummy.com/software/BeautifulSoup/bs4/doc/), [Requests](http://docs.python-requests.org/en/master/), Regex with python 3.5

## Libraries
### API
* Weather : [Forcast.io](https://developer.forecast.io/)
* Map : [Daum MAP](http://apis.map.daum.net/web/)

### Javascript
* [Apple-like one page scroller website](https://github.com/peachananr/onepage-scroll) by peachananr

### Weather Icons
* [Climacons](http://adamwhitcroft.com/climacons/) by [Adam Whitcroft](https://twitter.com/adamwhitcroft)

