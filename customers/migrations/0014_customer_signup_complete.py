# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-07-21 02:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0013_deliveryinfo_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='signup_complete',
            field=models.BooleanField(default=False),
        ),
    ]