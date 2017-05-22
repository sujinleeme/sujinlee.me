# Sujin Lee's official website
A website for personal blogging and project.

## About
- See : https://www.sujinlee.me
- Author : Design & Code by Sujin Lee
- Tech: Django 1.10(python 3.5+), HTML5 & SASS, JavaScript, gulp

## Version
- Last Updated : 2017. 2.
- version 1. : 2016. 3.

## References
#### Django third party apps
* [django-Markdown](https://github.com/klen/django_markdown), [django-tagging](https://github.com/brosner/django-tagging), [django-runsslserver](https://github.com/teddziuba/django-sslserver)

#### Design
* [Personal VCard](https://dribbble.com/shots/2529393-Personal-VCard) by Ali Sayed
* [Material Design Guide](https://material.io/) by Google

## Setting up Development Environment
Git clone this repository in your working directory.
`git clone https://github.com/sujinleeme/official-website.git`

## virtualenv
1 - Install new virtual environment
```python
python3 -m venv [name]
```

2 - Activate your virtual environment
```
source [name]/bin/activate
```

3 - Install packages according to requirements.txt
```
pip3 install -r requirements.txt
```

:heavy_exclamation_mark: [django_markdown package Issue](https://github.com/klen/django_markdown/issues/71)

Because`django_mardown` doesn't support the lastet version of django, depreciated `django.conf.urls.patterns' must to be removed. 

Make sure that hange your `urls.py` under `Lib/site-packages/django_markdown` to:

```python
""" Define preview URL. """

from django.conf.urls import url

from .views import preview

urlpatterns = [
    url('preview/$', preview, name='django_markdown_preview'),
]
```
4. DB migration
```
python3 manage.py migrate
```

## gulp
1 - Activate virtual enviroment firstly and run this command in your project directory to install gulp.
```
npm install --save-dev gulp
```

2 - And than, install gulp packages according to `package.json`.
```
npm install
```


## Run Development Server
1 - Start the web server by running python manage.py runserver
```
python manage.py runsslserver
```

2 - Run gulp to work frontend automating tasks.
```
gulp watch
```

