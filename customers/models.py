# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Customer(models.Model):
    email = models.CharField(max_length=100, blank=False)
    password = models.CharField(max_length=100, blank=False)
    zipcode = models.CharField(max_length=100, blank=False)
    first_name = models.CharField(max_length=100, blank=False)
    last_name = models.CharField(max_length=100, blank=False)
    address_1 = models.CharField(max_length=100, blank=False)
    address_2 = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=False)
    us_state = models.CharField(max_length=100, blank=False)
    phone = models.CharField(max_length=100, blank=False)
    token = models.CharField(max_length=100, blank=True)
    special_instruction = models.CharField(max_length=500, blank=True)
    plan_type = models.CharField(max_length=100, blank=True)
    number_of_dishes = models.CharField(max_length=100, blank=True)
    delivery_day = models.CharField(max_length=100, blank=True)
