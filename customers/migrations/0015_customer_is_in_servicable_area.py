# -*- coding: utf-8 -*-
# Generated by Django 1.11.12 on 2018-08-02 03:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0014_customer_signup_complete'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='is_in_servicable_area',
            field=models.BooleanField(default=True),
        ),
    ]
