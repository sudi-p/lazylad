# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Customer(models.Model):
    email = models.CharField(max_length=100, blank=False)
    password = models.CharField(max_length=100, blank=False)
    zipcode = models.CharField(max_length=100, blank=False)
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)
    phone = models.CharField(max_length=100, null=True)
    signup_complete = models.BooleanField(default=False)
    is_in_servicable_area = models.BooleanField(default=True)

    def __str__(self):
        return self.email


class CustomerRestaurant(models.Model):
    customer_id = models.IntegerField(blank=False)
    restaurant_id = models.IntegerField(blank=False)


class CustomerPayment(models.Model):
    customer_id = models.IntegerField(blank=False)
    last_4 = models.IntegerField(blank=False)
    card_type = models.CharField(max_length=100, blank=False)
    card_name = models.CharField(max_length=100, blank=False)
    card_expiration_month = models.IntegerField(blank=False)
    card_expiration_year = models.IntegerField(blank=False)
    stripe_customer_id = models.CharField(max_length=100, blank=False)
    is_active = models.BooleanField(default=False)
    is_default = models.BooleanField(default=False)


class DeliveryInfo(models.Model):
    customer_id = models.IntegerField(blank=False)
    zipcode = models.CharField(max_length=100, blank=False)
    address_1 = models.CharField(max_length=100, blank=False)
    address_2 = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=False)
    us_state = models.CharField(max_length=100, blank=False)
    phone = models.CharField(max_length=100, null=True)
    delivery_day = models.CharField(max_length=100, blank=True)


class CustomerFoodPreferences(models.Model):
    customer_id = models.IntegerField(blank=False)
    special_instruction = models.CharField(max_length=500, blank=True)
    is_vegeterian = models.BooleanField(default=False)


class CustomerMealPlan(models.Model):
    customer_id = models.IntegerField(blank=False)
    plan_type = models.CharField(max_length=100, blank=True)
    number_of_dishes = models.CharField(max_length=100, blank=True)
    price_shipping = models.CharField(max_length=100, blank=True)
    price_weekly = models.CharField(max_length=100, blank=True)

    def get_plan_type(self):
        if (self.number_of_dishes == 5):
            plan_type = "5day"

        else:
            plan_type = "3day"

        return plan_type
