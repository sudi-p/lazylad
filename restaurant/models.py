# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from datetime import date
# from common.models import BaseModel

# Create your models here.


class Restaurant(models.Model):
    restaurant_name = models.CharField(max_length=100, blank=False)
    street_address = models.CharField(max_length=100, blank=False)
    phone = models.CharField(max_length=100, blank=False)
    website = models.CharField(max_length=100, blank=True)
    yelp_score = models.PositiveSmallIntegerField(blank=True)
    link_to_yelp_score = models.CharField(max_length=1000, blank=True)
    foursquare_score = models.PositiveSmallIntegerField(blank=True)
    link_to_foursquare_score = models.CharField(max_length=1000, blank=True)
    google_score = models.PositiveSmallIntegerField(blank=True)
    link_to_google_score = models.CharField(max_length=1000, blank=True)
    logo_url = models.CharField(max_length=1000, blank=False)

    def __str__(self):
        return self.restaurant_name


class Dish(models.Model):
    dish_name = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=5000, blank=False)
    image_url = models.CharField(max_length=1000, blank=False)
    is_vegeterian = models.BooleanField(default=False)
    calorie = models.PositiveSmallIntegerField(blank=True)
    ingredients_description = models.CharField(max_length=5000, blank=True)
    restaurant_id = models.CharField(max_length=100, blank=False)

    def __str__(self):
        return self.dish_name


class WeeklyMenu(models.Model):
    restaurant_id = models.CharField(max_length=100, blank=False)
    week = models.DateField()


class WeeklyMenuItem(models.Model):
    weeklymenu_id = models.CharField(max_length=100, blank=False)
    dish = models.ForeignKey(
        Dish,
        on_delete=models.PROTECT
    )
    three_day_plan_default = models.BooleanField(default=False)
    five_day_plan_default = models.BooleanField(default=False)
