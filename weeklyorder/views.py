# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from rest_framework.decorators import api_view
from weeklyorder import controllers, exceptions
from rest_framework.response import Response

# Create your views here.


@api_view(['GET'])
def get_current_plan(request):
    email = request.query_params.get('email')
    try:
        data = controllers.get_current_plan(email)
    except exceptions.CustomerDoesNotExist:
        return Response(
            data={
                'error_code': 'customer_doesnot_exist'
            },
            status=204
        )
    except exceptions.CurrentMenuDoesNotExist:
        return Response(
            data={
                'error_code': 'current_menu_doesnot_exist'
            },
            status=204
        )
    return Response(
        data=data,
        status=200
    )


@api_view(['GET'])
def get_upcoming_plans(request):
    email = request.query_params.get('email')
    try:
        data = controllers.get_upcoming_plans(email)
    except exceptions.CustomerDoesNotExist:
        return Response(
            data={
                'error_code': 'customer_doesnot_exist'
            },
            status=204
        )
    except exceptions.UpcomingMenuDoesNotExist:
        return Response(
            data={
                'error_code': 'upcoming_menus_doesnot_exist'
            },
            status=204
        )
    return Response(
        data=data,
        status=200
    )


@api_view(['GET'])
def handle_skip(request):
    weeklyorder_id = request.query_params.get('weeklyorder_id')
    email = request.query_params.get('email')
    try:
        data = controllers.handle_skip(email, weeklyorder_id)
    except exceptions.CustomerDoesNotExist:
        return Response(
            data={
                'error_code': 'customer_doesnot_exist'
            },
            status=200
        )
    except exceptions.UnauthorisedAccess:
        return Response(
            data={
                'error_code': 'unauthorised_access'
            },
            status=200
        )
    return Response(
        data=data,
        status=200
    )


@api_view(['GET'])
def handle_unskip(request):
    weeklyorder_id = request.query_params.get('weeklyorder_id')
    email = request.query_params.get('email')
    try:
        data = controllers.handle_unskip(email, weeklyorder_id)
    except exceptions.CustomerDoesNotExist:
        return Response(
            data={
                'error_code': 'customer_doesnot_exist'
            },
            status=200
        )
    except exceptions.UnauthorisedAccess:
        return Response(
            data={
                'error_code': 'unauthorised_access'
            },
            status=200
        )
    return Response(
        data=data,
        status=200
    )


@api_view(['POST'])
def save_disheschange(request):
    dish_list = request.data.get('dish_list')
    weeklyorder_id = request.data.get('weeklyorder_id')
    email = request.data.get('email')
    try:
        data = controllers.save_disheschange(email, weeklyorder_id, dish_list)
    except exceptions.CustomerDoesNotExist:
        return Response(
            data={
                'error_code': 'customer_doesnot_exist'
            },
            status=200
        )
    except exceptions.UnauthorisedAccess:
        return Response(
            data={
                'error_code': 'unauthorised_access'
            },
            status=200
        )
    return Response(
        data=data,
        status=200
    )


@api_view(['GET'])
def get_deliveryhistory(request):
    email = request.query_params.get('email')
    try:
        customer_data = controllers.get_deliveryhistory(email)
    except exceptions.CustomerDoesNotExist:
        return Response(
            data={
                'error_code': 'customer_doesnot_exist'
            },
            status=200
        )

    except exceptions.ZeroDeliveryHistory:
        return Response(
            data={
                'error_code': 'zero_delivery_history'
            },
            status=200
        )
    return Response(
        data=customer_data,
        status=200
    )
