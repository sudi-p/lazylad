# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Dish(models.Model):
    dish_name = models.CharField(max_length=100, blank=False)
    price = models.CharField(max_length=100, blank=False)
    dish_status = models.PositiveIntegerField(blank=False, default=0)
    short_description = models.CharField(max_length=20, blank=True)
    long_description = models.CharField(max_length=20000, blank=True)


class Ingredient(models.Model):
    dish = models.ForeignKey(
        Dish,
        on_delete=models.CASCADE
    )
    ingredient = models.CharField(max_length=100, blank=True)
