# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-05-26 09:39
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dishes', '0002_dish_status'),
    ]

    operations = [
        migrations.RenameField(
            model_name='dish',
            old_name='status',
            new_name='dish_status',
        ),
    ]
