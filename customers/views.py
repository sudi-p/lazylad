# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.response import Response

from customers import serializers
from customers import controllers


class CheckCustomer(APIView):

    def post(self, request):
        new_customer = request.data.get('new_customer')
        data = controllers.check_customer(new_customer)
        return Response(data)


class AddCustomer(APIView):

    def post(self, request):
        new_customer = request.data.get('new_customer')
        print new_customer.get('token')
        customer_data = serializers.CustomerSerializer(
            data=new_customer
        )
        if customer_data.is_valid():
            print customer_data.data
            data = controllers.add_customer(customer_data.data)
            return Response(data)
        else:
            print customer_data.errors
