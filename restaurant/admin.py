# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from restaurant.models import Restaurant, Dish, Plan, PlanItems

# Register your models here.


class RestaurantAdmin(admin.ModelAdmin):
    model = Restaurant
    list_display = ['restaurant_name', 'street_address']


class DishAdmin(admin.ModelAdmin):
    model = Dish
    list_display = ['id', 'dish_name', 'restaurant', 'price']


class PlanAdmin(admin.ModelAdmin):
    model = Plan
    list_display = ['plan_type', 'week', 'price']


class PlanItemsAdmin(admin.ModelAdmin):
    model = PlanItems
    list_display = ['plan', 'dish', 'id']


admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(Plan, PlanAdmin)
admin.site.register(PlanItems, PlanItemsAdmin)
