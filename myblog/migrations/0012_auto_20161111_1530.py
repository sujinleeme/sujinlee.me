# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-11 06:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myblog', '0011_auto_20161111_1517'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(unique=False),
        ),
        migrations.AlterField(
            model_name='project',
            name='slug',
            field=models.SlugField(unique=False),
        ),
    ]
