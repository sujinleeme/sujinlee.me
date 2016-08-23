# RUN UNLIMITED // KOREA (2016 Korea Marathon Events Web-Crawling) 
I love running. In Korea, [Marathon Online](http://www.marathon.pe.kr/schedule_index.html) is the most famous marathon information website for over 15 years and all the runners use it. However, this site has old user interface design, and encoding problem.
For these reasons, I've decided revamp this website. For now, I can check weather, location as well as information and decide where I will go and enjoy event!

## Built With
* Django 1.9 
* [BeautifulSoup4](https://www.crummy.com/software/BeautifulSoup/bs4/doc/), [Requests](http://docs.python-requests.org/en/master/), Regex with python 3.5

## References
### APIs
* Weather : [Forcast.io](https://developer.forecast.io/)
* Map : [Daum MAP](http://apis.map.daum.net/web/)

### Weather Icons
* [Climacons](http://adamwhitcroft.com/climacons/) by [Adam Whitcroft](https://twitter.com/adamwhitcroft)

### Design
* Inspired by a promotion event, `Unlimited Together(한계는 없다)` hosted by NIKE KOREA
* [Horizontal Tab Menu](http://codepen.io/ettrics/pen/qEeZRY) by [Ettrics Crop.](http://ettrics.com/portfolio/)

## Release
* 2016. 06. 23. - First published
* 2016. 08. 18. - Add weather & map(latitude, longitude, map url) data with APIs, weather icons
* 2016. 08. 23. - UX & Design renewal

## Next Working
* Json for APIs
* Mobile Web View