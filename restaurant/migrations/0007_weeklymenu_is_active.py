# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-08-02 18:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0006_auto_20180730_1659'),
    ]

    operations = [
        migrations.AddField(
            model_name='weeklymenu',
            name='is_active',
            field=models.BooleanField(default=True),
        ),
    ]