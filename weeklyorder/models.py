# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


class WeeklyOrder(models.Model):
    customer_id = models.IntegerField(blank=False)
    weeklymenu_id = models.IntegerField(blank=False)
    skipped = models.BooleanField(default=False)
    delivered = models.BooleanField(default=False)
    charged = models.BooleanField(default=False)
    week_start_date = models.DateField()
    restaurant_id = models.CharField(max_length=1500)


class WeeklyOrderItem(models.Model):
    weeklyorder_id = models.IntegerField(blank=False)
    dish_id = models.IntegerField(blank=False)
