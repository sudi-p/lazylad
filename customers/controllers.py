from django.db import transaction
from lazylad.settings import SERVICABLE_ZIPCODES, STRIPE_API_KEY
from customers.models import Customer,\
    DeliveryInfo, CustomerMealPlan, CustomerRestaurant,\
    CustomerFoodPreferences, CustomerPayment
from customers.serializers import CustomerSerializer,\
    DeliveryInfoSerializer, MealPlanSerializer, PaymentSerializer
from restaurant.models import Restaurant, WeeklyMenu, WeeklyMenuItem
from weeklyorder.models import WeeklyOrder, WeeklyOrderItem
from customers import hash_password
from customers import exceptions
from datetime import date, timedelta
import stripe


def create_customer(email, password, zipcode):
    zipcode_we_serve = SERVICABLE_ZIPCODES
    if Customer.objects.filter(email=email):
        raise exceptions.EmailAlreadyExists()

    password = hash_password.make_pw_hash(password)

    if zipcode not in zipcode_we_serve:
        customer = Customer.objects.create(
            email=email,
            password=password,
            zipcode=zipcode,
            is_in_servicable_area=False
        )
        raise exceptions.ZipCodeNotServed()

    customer = Customer.objects.create(
        email=email,
        password=password,
        zipcode=zipcode,
        is_in_servicable_area=True
    )
    return customer


def select_mealplan(
    email,
    number_of_dishes,
    price_shipping,
    price_weekly,
    plan_type
):
    customer = get_customer_by_email(email)
    customer_meal_plan = CustomerMealPlan.objects.filter(
        customer_id=customer.id
    )
    if not customer_meal_plan:
        customer_meal_plan = CustomerMealPlan.objects.create(
            customer_id=customer.id,
            plan_type=plan_type,
            number_of_dishes=number_of_dishes,
            price_shipping=price_shipping,
            price_weekly=price_weekly
        )
    else:
        customer_meal_plan = customer_meal_plan[0]
        customer_meal_plan.plan_type = plan_type
        customer_meal_plan.number_of_dishes = number_of_dishes
        customer_meal_plan.price_shipping = price_shipping
        customer_meal_plan.price_weekly = price_weekly
        customer_meal_plan.save()

    customer_meal_plan = MealPlanSerializer(
        customer_meal_plan
    ).data
    return customer_meal_plan


def complete_signup(
    email,
    zipcode,
    first_name,
    last_name,
    address_1,
    address_2,
    city,
    us_state,
    phone,
    special_instruction,
    delivery_day,
    stripe_token,
    first_week_skip
):
    customer = get_customer_by_email(email)
    zipcode_we_serve = SERVICABLE_ZIPCODES
    if zipcode not in zipcode_we_serve:
        customer.is_in_servicable_area = False
        customer.save()
        raise exceptions.ZipCodeNotServed()
    customer_id = customer.id
    stripe.api_key = STRIPE_API_KEY
    stripe_customer = stripe.Customer.create(
        source=stripe_token.get('id'),
        email=email
    )
    card_data = stripe_customer.get("sources").get("data")[0]
    restaurant = Restaurant.objects.get(restaurant_name="Red Lentils")
    customer_meal_plan = CustomerMealPlan.objects.get(
        customer_id=customer_id
    )
    customer_meal_plan_data = MealPlanSerializer(customer_meal_plan).data
    number_of_dishes = customer_meal_plan_data['number_of_dishes']
    with transaction.atomic():
        customer.phone = phone
        customer.zipcode = zipcode
        customer.first_name = first_name
        customer.last_name = last_name
        customer.signup_complete = True
        customer.save()

        DeliveryInfo.objects.create(
            customer_id=customer_id,
            zipcode=zipcode,
            address_1=address_1,
            address_2=address_2,
            city=city,
            us_state=us_state,
            phone=phone,
            delivery_day=delivery_day
        )

        CustomerRestaurant.objects.create(
            customer_id=customer_id,
            restaurant_id=restaurant.id
        )

        CustomerPayment.objects.create(
            customer_id=customer_id,
            last_4=card_data.get("last4"),
            card_type=card_data.get("brand"),
            card_name="Temporary Name",
            card_expiration_month=card_data.get("exp_month"),
            card_expiration_year=card_data.get("exp_year"),
            stripe_customer_id=card_data.get("customer")
        )
        CustomerFoodPreferences.objects.create(
            customer_id=customer_id,
            special_instruction=special_instruction
        )
        create_weeklyorder(customer_id, restaurant.id, number_of_dishes, first_week_skip)
    customer_data = get_appstate(customer_id)
    return customer_data


def create_weeklyorder(customer_id, restaurant_id, number_of_dishes, first_week_skip):
    weekly_menus = WeeklyMenu.objects.filter(
        restaurant_id=restaurant_id
    ).filter(
        week__gte=date.today() - timedelta(7)
    )
    current_weeklymenu = weekly_menus.filter(
        week__range=(date.today() - timedelta(7), date.today())
    )
    for weeklymenu in weekly_menus:
        if (current_weeklymenu):
            if (current_weeklymenu[0].id == weeklymenu.id):
                weeklyorder = WeeklyOrder.objects.create(
                    customer_id=customer_id,
                    weeklymenu_id=weeklymenu.id,
                    week_start_date=weeklymenu.week,
                    restaurant_id=weeklymenu.restaurant_id,
                    skipped=first_week_skip
                )
            else:
                weeklyorder = WeeklyOrder.objects.create(
                    customer_id=customer_id,
                    weeklymenu_id=weeklymenu.id,
                    week_start_date=weeklymenu.week,
                    restaurant_id=weeklymenu.restaurant_id
                )
        else:
            weeklyorder = WeeklyOrder.objects.create(
                customer_id=customer_id,
                weeklymenu_id=weeklymenu.id,
                week_start_date=weeklymenu.week,
                restaurant_id=weeklymenu.restaurant_id
            )
        if (number_of_dishes == "3"):
            weekly_menu_default_items = WeeklyMenuItem.objects.filter(
                weeklymenu_id=weeklymenu.id
            ).filter(
                three_day_plan_default=True
            )
        else:
            weekly_menu_default_items = WeeklyMenuItem.objects.filter(
                weeklymenu_id=weeklymenu.id
            ).filter(
                five_day_plan_default=True
            )
        for weekly_menu_default_item in weekly_menu_default_items:
            WeeklyOrderItem.objects.create(
                weeklyorder_id=weeklyorder.id,
                dish_id=weekly_menu_default_item.dish.id
            )


def login_customer(email, password):
    customer = get_customer_by_email(email)
    customer_data = CustomerSerializer(customer).data
    if not customer.is_in_servicable_area:
        raise exceptions.ZipCodeNotServed()

    if (hash_password.check_pw_hash(password, customer.password)):
        customer_data = get_appstate(customer.id)
        return customer_data

    else:
        raise exceptions.EmailPasswordDoesNotMatch()


def get_customer_by_id(customer_id):
    customer = Customer.objects.filter(
        id=customer_id
    )

    if not customer:
        raise exceptions.CustomerDoesNotExist()

    return customer[0]


def get_customer_by_email(email):
    customers = Customer.objects.filter(
        email=email
    )
    if not customers:
        raise exceptions.CustomerDoesNotExist()
    customer = customers[0]
    return customer


def get_appstate(customer_id):
    try:
        customer = get_customer_by_id(customer_id)
        customer_data = CustomerSerializer(customer).data
        customer_meal_plan = CustomerMealPlan.objects.filter(
            customer_id=customer_id
        )
        data = {}
        data.update({
            'user': customer_data
        })
        if customer_meal_plan:
            customer_meal_plan = MealPlanSerializer(
                customer_meal_plan[0]
            ).data
            data.update({
                'plan': customer_meal_plan
            })

        return data

    except Exception as err:
        raise err


def get_alluserinformation(email):
    try:
        customer = get_customer_by_email(email)
        customer_delivery = DeliveryInfo.objects.get(customer_id=customer.id)
        delivery = DeliveryInfoSerializer(customer_delivery).data
        delivery['first_name'] = customer.first_name
        delivery['last_name'] = customer.last_name
        customer_subscriptions = CustomerMealPlan.objects.get(
            customer_id=customer.id
        )
        customer_payment = CustomerPayment.objects.get(customer_id=customer.id)
        customer_info = {}
        customer_info.update({
            'account': CustomerSerializer(customer).data,
            'delivery': delivery,
            'subscription': MealPlanSerializer(customer_subscriptions).data,
            'payment': PaymentSerializer(customer_payment).data
        })
        return customer_info

    except Exception as err:
        raise err


def get_subscriptionsinformation(email):
    try:
        customer = get_customer_by_email(email)
        customer_subscriptions = CustomerMealPlan.objects.get(
            customer_id=customer.id
        )
        customer_info = {}
        customer_info.update({
            'subscription': MealPlanSerializer(customer_subscriptions).data
        })
        return customer_info

    except Exception as err:
        raise err


def get_deliveryinformation(email):
    try:
        customer = get_customer_by_email(email)
        customer_delivery = DeliveryInfo.objects.get(customer_id=customer.id)
        delivery = DeliveryInfoSerializer(customer_delivery).data
        delivery['first_name'] = customer.first_name
        delivery['last_name'] = customer.last_name
        customer_info = {}
        customer_info.update({
            'delivery': delivery,
        })
        return customer_info

    except Exception as err:
        raise err


def get_accountinformation(email):
    try:
        customer = get_customer_by_email(email)
        customer_info = {}
        customer_info.update({
            'account': CustomerSerializer(customer).data,
        })
        return customer_info

    except Exception as err:
        raise err


def get_paymentinformation(email):
    try:
        customer = get_customer_by_email(email)
        customer_payment = CustomerPayment.objects.get(customer_id=customer.id)
        customer_info = {}
        customer_info.update({
            'payment': PaymentSerializer(customer_payment).data
        })
        return customer_info

    except Exception as err:
        raise err


def update_subscription(email, updated_values):
    try:
        customer = get_customer_by_email(email)
        number_of_dishes = updated_values.get('dishes_per_week')
        with transaction.atomic():
            customer_meal_plan = CustomerMealPlan.objects.get(
                customer_id=customer.id
            )
            customer_restaurant = CustomerRestaurant.objects.get(
                customer_id=customer.id
            )
            if (customer_meal_plan.number_of_dishes != number_of_dishes):
                customer_restaurant = CustomerRestaurant.objects.get(
                    customer_id=customer.id
                )
                WeeklyOrder.objects.filter(
                    customer_id=customer.id
                ).filter(
                    week_start_date__gt=date.today()
                ).delete()
                create_weeklyorder(
                    customer.id,
                    customer_restaurant.restaurant_id,
                    number_of_dishes,
                    False
                )
            customer_meal_plan.plan_type = updated_values.get('plan_type')
            customer_meal_plan.number_of_dishes = number_of_dishes
            customer_meal_plan.delivery_day = updated_values.get('delivery_day')
            customer_meal_plan.save()
            customer_info = get_subscriptionsinformation(email)
        return customer_info

    except Exception as err:
        raise err


def update_account(email, updated_values):
    try:
        customer = get_customer_by_email(email)
        password = updated_values.get('password')
        customer_account = Customer.objects.get(
            id=customer.id
        )
        customer_account.first_name = updated_values.get('first_name')
        customer_account.last_name = updated_values.get('last_name')
        customer_account.email = updated_values.get('email')
        if password:
            password = hash_password.make_pw_hash(password)
            customer_account.password = password
        customer_account.save()
        customer_info = get_accountinformation(updated_values.get('email'))
        return customer_info

    except Exception as err:
        raise err


def update_delivery(email, updated_values):
    try:
        customer = get_customer_by_email(email)
        customer_delivery = DeliveryInfo.objects.get(
            customer_id=customer.id
        )
        customer_delivery.address_1 = updated_values.get('address_1')
        customer_delivery.address_2 = updated_values.get('address_2')
        customer_delivery.city = updated_values.get('city')
        customer_delivery.phone = updated_values.get('phone')
        customer_delivery.save()
        customer_info = get_deliveryinformation(email)
        return customer_info

    except Exception as err:
        raise err


def update_payment(email, updated_values):
    try:
        customer = get_customer_by_email(email)
        customer_payment = CustomerPayment.objects.get(
            customer_id=customer.id
        )
        with transaction.atomic():
            stripe.api_key = STRIPE_API_KEY
            stripe_token = updated_values.get('stripe_token').get('token')
            stripe_customer = stripe.Customer.create(
                source=stripe_token.get('id'),
                email=email
            )
            card_data = stripe_customer.get("sources").get("data")[0]
            customer_payment.last_4 = card_data.get("last4")
            customer_payment.card_type = card_data.get("brand")
            customer_payment.card_name = "Temporary Name"
            customer_payment.card_expiration_month = card_data.get("exp_month")
            customer_payment.card_expiration_year = card_data.get("exp_year")
            customer_payment.stripe_customer_id = card_data.get("customer")
            customer_payment.save()
            customer_info = get_paymentinformation(email)
        return customer_info

    except Exception as err:
        raise err
