# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.views import APIView

from dishes import controllers
from dishes import serializers


class GetDish(APIView):

    def get(self, request, pk):
        dish = controllers.get_dish(pk)
        return Response(dish)


class GetDishes(APIView):

    def get(self, request):
        dishes = controllers.get_dishes()
        return Response(dishes)


class AddDish(APIView):

    def post(self, request):
        dish = request.data.get('new_dish').get('newDish')
        serializer = serializers.DishSerializer(
            data=dish
        )
        if serializer.is_valid():
            new_dish = controllers.add_dish(serializer.data)
            return Response(new_dish)
        else:
            print serializer.errors
            return Response(serializer.errors)


class AddDishInfo(APIView):

    def post(self, request, pk):
        short_description = request.data.get(
            'dish_info').get('short_description')
        long_description = request.data.get(
            'dish_info').get('long_description')
        ingredients = request.data.get('dish_info').get('ingredients')
        controllers.add_dish_info(
            pk,
            short_description,
            long_description,
            ingredients
        )
        return Response("success")
