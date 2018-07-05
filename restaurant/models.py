# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
# from common.models import BaseModel
from restaurant.constants import PLAN_TYPE_OPTIONS

# Create your models here.


class Restaurant(models.Model):
    restaurant_name = models.CharField(max_length=100, blank=False)
    street_address = models.CharField(max_length=100, blank=False)
    rating = models.DecimalField(max_digits=2, decimal_places=1, blank=True)
    rating_number = models.PositiveSmallIntegerField(blank=True)
    open_time = models.TimeField()
    close_time = models.TimeField()
    logo_url = models.CharField(max_length=1000, blank=True)

    def __str__(self):
        return self.restaurant_name


class Dish(models.Model):
    dish_name = models.CharField(max_length=100, blank=False)
    description = models.CharField(max_length=5000, blank=False)
    price = models.CharField(max_length=100, blank=False)
    image_url = models.CharField(max_length=1000, blank=True)
    is_vegeterian = models.BooleanField(default=False)
    calorie = models.PositiveSmallIntegerField(blank=True)
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.dish_name


class Plan(models.Model):
    restaurant = models.ForeignKey(
        Restaurant,
        on_delete=models.CASCADE,
        related_name='res3'
    )
    plan_type = models.CharField(
        max_length=10,
        choices=PLAN_TYPE_OPTIONS
    )
    price = models.CharField(max_length=100, blank=False)
    week = models.DateField()

    def __str__(self):
        return self.plan_type


class PlanItems(models.Model):
    plan = models.ForeignKey(
        Plan,
        on_delete=models.CASCADE
    )
    dish = models.ForeignKey(
        Dish,
        on_delete=models.CASCADE,
        related_name='dish51'
    )
