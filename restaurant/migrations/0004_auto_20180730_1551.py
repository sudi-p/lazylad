# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-07-30 15:51
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0003_auto_20180730_1522'),
    ]

    operations = [
        migrations.RenameField(
            model_name='weeklymenuitem',
            old_name='weeklymenu_id',
            new_name='weeklymenu',
        ),
    ]
