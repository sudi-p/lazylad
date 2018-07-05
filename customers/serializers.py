from rest_framework.serializers import ModelSerializer
from models import Customer


class CustomerSerializer(ModelSerializer):

    class Meta:
        model = Customer
        fields = [
            'email', 'id', 'password', 'zipcode',
            'first_name', 'last_name', 'address_1',
            'address_2', 'city', 'us_state',
            'phone', 'token', 'special_instruction',
            'plan_type', 'number_of_dishes', 'delivery_day'
        ]
