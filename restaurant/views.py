# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from restaurant import exceptions

from restaurant import controllers
# from restaurant import serializers

# Create your views here.


@api_view(['GET'])
def get_weeklymenus(request):
    try:
        menu_data = controllers.get_weeklymenus()

    except exceptions.MenuNotAvailable():
        return Response(
            data={
                'error_code': 'menu_not_available'
            },
            status=status.HTTP_204_NO_CONTENT
        )
    return Response(
        data=menu_data,
        status=status.HTTP_200_OK
    )
