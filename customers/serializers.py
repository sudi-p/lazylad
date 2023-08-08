from rest_framework import serializers
from models import Customer, DeliveryInfo, CustomerMealPlan, CustomerPayment


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            'email', 'id', 'zipcode',
            'first_name', 'last_name', 'signup_complete'
        ]


class SignupDataDeserializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100)
    zipcode = serializers.CharField(max_length=100)


class LogInDeserializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=100)


class DeliveryInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeliveryInfo
        fields = [
            'zipcode', 'address_1',
            'address_2', 'city', 'us_state', 'phone'
        ]


class MealPlanSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerMealPlan
        fields = [
            'plan_type', 'number_of_dishes',
            'price_shipping', 'price_weekly'
        ]


class PaymentSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerPayment
        fields = [
            'last_4', 'card_type', 'card_name',
            'card_expiration_month', 'card_expiration_year',
            'stripe_customer_id',
        ]


class SignupPaymentDeserializer(serializers.Serializer):
    number_of_dishes = serializers.CharField(max_length=100)
    price_shipping = serializers.CharField(max_length=100)
    price_weekly = serializers.CharField(max_length=100)
    plan_type = serializers.CharField(max_length=100)


class SignupCompleteDeserializer(serializers.Serializer):
    email = serializers.CharField(max_length=100)
    zipcode = serializers.CharField(max_length=100)
    address_1 = serializers.CharField(max_length=100)
    city = serializers.CharField(max_length=100)
    us_state = serializers.CharField(max_length=100)
    phone = serializers.CharField(max_length=100)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    delivery_day = serializers.CharField(max_length=100)
