# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.views import APIView

from restaurant import controllers
# from restaurant import serializers

# Create your views here.


class GetMenu(APIView):

    def get(self, request):
        plans = controllers.get_menu()
        return Response(plans)


class GetThreeDaysPlans(APIView):

    def get(self, request):
        plans = controllers.get_threedaysplans()
        return Response(plans)


class GetFiveDaysPlans(APIView):

    def get(self, request):
        plans = controllers.get_fivedaysplans()
        return Response(plans)


class GetPlan(APIView):

    def get(self, request, pk):
        plan = controllers.get_plan(pk)
        return Response(plan)


class GetDish(APIView):

    def get(self, request, pk):
        dish = controllers.get_dish(pk)
        return Response(dish)
