# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from customers.models import Customer


class CustomerAdmin(admin.ModelAdmin):
    model = Customer
    list_display = ['email', 'password']

admin.site.register(Customer, CustomerAdmin)
