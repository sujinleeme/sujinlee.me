# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-11 09:44
from __future__ import unicode_literals

from django.db import migrations
import django_markdown.models


class Migration(migrations.Migration):

    dependencies = [
        ('myblog', '0013_auto_20161111_1539'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='body',
            field=django_markdown.models.MarkdownField(),
        ),
        migrations.AlterField(
            model_name='project',
            name='body',
            field=django_markdown.models.MarkdownField(),
        ),
    ]
