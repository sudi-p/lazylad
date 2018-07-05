from customers.models import Customer
from customers import serializers


def add_customer(customer):
    email = customer.get('email')
    password = customer.get('password')
    zipcode = customer.get('zipcode')
    first_name = customer.get('first_name') 
    last_name = customer.get('last_name')
    address_1 = customer.get('address_1')
    address_2 = customer.get('address_2')
    city = customer.get('city')
    us_state = customer.get('us_state')
    phone = customer.get('phone')
    token = customer.get('token')
    print token
    special_instruction = customer.get('special_instruction')
    plan_type = customer.get('plan_type')
    number_of_dishes = customer.get('number_of_dishes')
    delivery_day = customer.get('delivery_day')
    customer = Customer.objects.create(
        email=email,
        zipcode=zipcode,
        password=password,
        first_name=first_name,
        last_name=last_name,
        address_1=address_1,
        address_2=address_2,
        city=city,
        us_state=us_state,
        phone=phone,
        token='token',
        special_instruction=special_instruction,
        plan_type=plan_type,
        number_of_dishes=number_of_dishes,
        delivery_day=delivery_day
    )
    return serializers.CustomerSerializer(customer).data


def check_customer(customer):
    email = customer.get('email')
    check_customer = Customer.objects.filter(email=email)
    if(check_customer):
        return "Used"
    else:
        return "Not Used"
