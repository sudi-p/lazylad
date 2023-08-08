# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from restaurant.models import Restaurant, Dish, WeeklyMenu, WeeklyMenuItem

# Register your models here.


class RestaurantAdmin(admin.ModelAdmin):
    model = Restaurant
    list_display = ['restaurant_name', 'street_address']


class DishAdmin(admin.ModelAdmin):
    model = Dish
    list_display = ['id', 'dish_name', 'restaurant_id']


class WeeklyMenuAdmin(admin.ModelAdmin):
    model = WeeklyMenu
    list_display = [
        'restaurant_id', 'week'
    ]


class WeeklyMenuItemAdmin(admin.ModelAdmin):
    model = WeeklyMenuItem
    list_display = [
        'weeklymenu_id', 'dish_id',
        'three_day_plan_default', 'five_day_plan_default'
    ]


admin.site.register(Restaurant, RestaurantAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(WeeklyMenu, WeeklyMenuAdmin)
admin.site.register(WeeklyMenuItem, WeeklyMenuItemAdmin)
