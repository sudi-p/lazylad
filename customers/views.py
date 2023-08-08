# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes
from rest_framework import status
from rest_framework.authentication import TokenAuthentication

from customers import serializers
from customers import controllers
from customers import exceptions
import sys, errno


@api_view(['POST'])
def create_customer(request):
    customer_data = serializers.SignupDataDeserializer(
        data=request.data.get('customer_data')
    )
    if not customer_data.is_valid():
        return Response(
            data={
                'error_code': 'invalid_data',
                'details': customer_data.errors
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    customer_data = customer_data.validated_data
    try:
        customer = controllers.create_customer(
            email=customer_data['email'],
            password=customer_data['password'],
            zipcode=customer_data['zipcode'],
        )
    except exceptions.EmailAlreadyExists:
        return Response(
            data={
                'error_code': 'email_already_exists',
                'details': 'A user with the email {} already exists'.format(
                    customer_data['email']
                )
            },
            status=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    except exceptions.ZipCodeNotServed:
        return Response(
            data={
                'error_code': 'zipcode_not_served',
            },
            status=status.HTTP_200_OK,
        )

    return Response(
        status=status.HTTP_201_CREATED,
        data=serializers.CustomerSerializer(customer).data
    )


@api_view(['POST'])
def select_mealplan(request):
    email = request.data.get('email')
    meal_plan = request.data.get('meal_plan')
    meal_plan_data = serializers.SignupPaymentDeserializer(
        data=meal_plan
    )
    if not meal_plan_data.is_valid():
        return Response(
            data={
                'error_code': 'invalid_data',
                'details': meal_plan_data.errors
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
    meal_plan_data = meal_plan_data.data
    try:
        customer_meal_plan = controllers.select_mealplan(
            email,
            meal_plan_data['number_of_dishes'],
            meal_plan_data['price_shipping'],
            meal_plan_data['price_weekly'],
            meal_plan_data['plan_type'],
        )
    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )
    return Response(
        data=customer_meal_plan,
        status=status.HTTP_201_CREATED
    )


@api_view(['POST'])
def complete_signup(request):
    customer = request.data.get('customer')
    customer_data = serializers.SignupCompleteDeserializer(
        data=customer
    )
    special_instruction = customer.get('special_instruction')
    stripe_token = customer.get('stripe_token').get('token')
    address_2 = customer.get('address_2')
    first_week_skip = customer.get('first_week_skip')
    if not customer_data.is_valid():
        return Response(
            data={
                'error_code': 'invalid_data',
                'details': customer_data.errors
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
    customer_data = customer_data.data

    try:
        customer = controllers.complete_signup(
            customer_data['email'],
            customer_data['zipcode'],
            customer_data['first_name'],
            customer_data['last_name'],
            customer_data['address_1'],
            address_2,
            customer_data['city'],
            customer_data['us_state'],
            customer_data['phone'],
            special_instruction,
            customer_data['delivery_day'],
            stripe_token,
            first_week_skip,
        )

    except exceptions.EmailDoesNotExist:
        return Response(
            data={
                'error_code': 'email_doesnot_exist',
                'details': 'A user with the email {} doesnot exist.'.format(
                    customer_data['email']
                )
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    except exceptions.ZipCodeNotServed:
        return Response(
            data={
                'error_code': 'zipcode_not_served',
            },
            status=status.HTTP_200_OK,
        )

    return Response(
        data=customer,
        status=status.HTTP_201_CREATED
    )


class LogInCustomer(APIView):

    def post(self, request):
        customer_data = serializers.LogInDeserializer(
            data=request.data.get('customer')
        )
        if not customer_data.is_valid():
            return Response(
                data={
                    'error_code': 'invalid_data',
                    'details': customer_data.errors
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        customer_data = customer_data.data
        try:
            customer_data = controllers.login_customer(
                customer_data['email'],
                customer_data['password']
            )

        except exceptions.CustomerDoesNotExist:
            return Response(
                data={
                    'error_code': 'email_doesnot_exist',
                    'details': 'User with the email {} doesnot exist.'.format(
                        customer_data['email']
                    )
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        except exceptions.ZipCodeNotServed:
            return Response(
                data={
                    'error_code': 'zipcode_not_served',
                },
                status=status.HTTP_200_OK,
            )

        except exceptions.EmailPasswordDoesNotMatch:
            return Response(
                data={
                    'error_code': 'email_password_doesnot_match',
                    'details': 'User with the provided email \
                     and password doesnot match.'
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        except Exception:
            return Response(
                data={
                    'error_code': "server_error"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        # request.session['email'] = customer_data['email']
        return Response(
            data=customer_data,
            status=status.HTTP_200_OK
        )


@api_view(['GET'])
def get_appstate(request, customer_id):
    try:
        customer_data = controllers.get_appstate(customer_id)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
def get_alluserinformation(request):
    email = request.query_params.get('email')
    try:
        customer_data = controllers.get_alluserinformation(email)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
def get_subscriptionsinformation(request):
    email = request.query_params.get('email')
    try:
        customer_data = controllers.get_subscriptionsinformation(email)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
def get_deliveryinformation(request):
    email = request.query_params.get('email')
    try:
        customer_data = controllers.get_deliveryinformation(email)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
def get_accountinformation(request):
    email = request.query_params.get('email')
    try:
        customer_data = controllers.get_accountinformation(email)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
def get_paymentinformation(request):
    email = request.query_params.get('email')
    try:
        customer_data = controllers.get_paymentinformation(email)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def update_subscription(request):
    email = request.data.get('email')
    updated_values = request.data.get('updated_values')
    try:
        customer_data = controllers.update_subscription(email, updated_values)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def update_account(request):
    email = request.data.get('email')
    updated_values = request.data.get('updated_values')
    try:
        customer_data = controllers.update_account(email, updated_values)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def update_delivery(request):
    email = request.data.get('email')
    updated_values = request.data.get('updated_values')
    try:
        customer_data = controllers.update_delivery(email, updated_values)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def update_payment(request):
    email = request.data.get('email')
    updated_values = request.data.get('updated_values')
    try:
        customer_data = controllers.update_payment(email, updated_values)

    except exceptions.CustomerDoesNotExist():
        return Response(
            data={
                'error_code': 'customer_not_found'
            },
            status=status.HTTP_404_NOT_FOUND
        )

    except IOError as e:
        if e.errno == errno.EPIPE:
            print "How are khana khake jana hah"

    return Response(
        data=customer_data,
        status=status.HTTP_200_OK
    )
