from customers.models import CustomerMealPlan
from customers.controllers import get_customer_by_email
from restaurant.models import WeeklyMenuItem
from restaurant.serializers import DishSerializer
from weeklyorder.models import WeeklyOrder, WeeklyOrderItem
from weeklyorder.serializers import WeeklyOrderSerializer
from weeklyorder import exceptions
from datetime import date, timedelta
from django.db import transaction


def get_plan_details(customer_weeklyorder, customer):
    customer_weeklyorder = WeeklyOrderSerializer(
        customer_weeklyorder
    ).data
    customer_weeklyorder_items = WeeklyOrderItem.objects.filter(
        weeklyorder_id=customer_weeklyorder.get('id')
    )
    selected_dishes = []
    for customer_weeklyorder_item in customer_weeklyorder_items:
        selected_dishes.append(customer_weeklyorder_item.dish_id)
    weeklymenu_items = WeeklyMenuItem.objects.filter(
        weeklymenu_id=customer_weeklyorder.get('weeklymenu_id')
    )
    customer_meal_plan = CustomerMealPlan.objects.get(
        customer_id=customer.id
    )
    if (customer_meal_plan.number_of_dishes == "5"):
        weeklymenu_items = weeklymenu_items.order_by(
            '-five_day_plan_default'
        )
    else:
        weeklymenu_items = weeklymenu_items.order_by(
            '-three_day_plan_default'
        )
    menu_items = []
    for weeklymenu_item in weeklymenu_items:
        dish = DishSerializer(weeklymenu_item.dish).data
        if weeklymenu_item.dish.id in selected_dishes:
            dish.update(
                {'selected': True}
            )
        else:
            dish.update(
                {'selected': False}
            )
        menu_items.append(
            dish
        )
    customer_weeklyorder.update(
        {'menu_items': menu_items}
    )
    return customer_weeklyorder


def get_current_plan(email):
    try:
        customer = get_customer_by_email(email)
        current_customer_weeklyorder = WeeklyOrder.objects.filter(
            customer_id=customer.id
        ).filter(
            week_start_date__range=(date.today() - timedelta(7), date.today())
        )

        if not current_customer_weeklyorder:
            raise exceptions.CurrentMenuDoesNotExist()
        customer_current_plan = get_plan_details(
            current_customer_weeklyorder[0], customer
        )
        return customer_current_plan

    except Exception as err:
        raise err


def get_upcoming_plans(email):
    try:
        customer = get_customer_by_email(email)
        upcoming_customer_weeklyorders = WeeklyOrder.objects.filter(
            customer_id=customer.id
        ).filter(
            week_start_date__gt=date.today()
        )
        if not upcoming_customer_weeklyorders:
            raise exceptions.UpcomingMenuDoesNotExist()

        upcoming_customer_weeklyorders_list = []
        for upcoming_customer_weeklyorder in upcoming_customer_weeklyorders:
            weekly_menu_data = get_plan_details(
                upcoming_customer_weeklyorder, customer
            )
            upcoming_customer_weeklyorders_list.append(weekly_menu_data)

        return upcoming_customer_weeklyorders_list

    except Exception as err:
        raise err


def handle_skip(email, weeklyorder_id):
    try:
        customer = get_customer_by_email(email)
        customer_weeklyorder = WeeklyOrder.objects.get(id=weeklyorder_id)
        if (customer_weeklyorder.customer_id != customer.id):
            raise exceptions.UnauthorisedAccess()
        else:
            customer_weeklyorder.skipped = True
            customer_weeklyorder.save()
            plans = get_upcoming_plans(email)
            return plans

    except Exception as err:
        raise err


def handle_unskip(email, weeklyorder_id):
    try:
        customer = get_customer_by_email(email)
        customer_weeklyorder = WeeklyOrder.objects.get(id=weeklyorder_id)
        if (customer_weeklyorder.customer_id != customer.id):
            raise exceptions.UnauthorisedAccess()
        else:
            customer_weeklyorder.skipped = False
            customer_weeklyorder.save()
            plans = get_upcoming_plans(email)
            return plans

    except Exception as err:
        raise err


def save_disheschange(email, weeklyorder_id, dish_list):
    try:
        customer = get_customer_by_email(email)
        customer_weeklyorder = WeeklyOrder.objects.get(id=weeklyorder_id)
        if (customer_weeklyorder.customer_id != customer.id):
            raise exceptions.UnauthorisedAccess()
        else:
            with transaction.atomic():
                WeeklyOrderItem.objects.filter(
                    weeklyorder_id=weeklyorder_id
                ).delete()
                for dish_id in dish_list:
                    WeeklyOrderItem.objects.create(
                        weeklyorder_id=weeklyorder_id,
                        dish_id=dish_id
                    )
        plans = get_upcoming_plans(email)
        return plans

    except Exception as err:
        raise err


def get_deliveryhistory(email):
    try:
        customer = get_customer_by_email(email)
        delivered_customer_weeklyorders = WeeklyOrder.objects.filter(
            customer_id=customer.id
        ).filter(
            delivered=True
        )
        if not delivered_customer_weeklyorders:
            raise exceptions.ZeroDeliveryHistory()
        delivered_weeklyorders_list = []
        for delivered_customer_weeklyorder in delivered_customer_weeklyorders:
            weekly_menu_data = get_plan_details(
                delivered_customer_weeklyorder, customer
            )
            delivered_weeklyorders_list.append(weekly_menu_data)
        return delivered_weeklyorders_list

    except Exception as err:
        raise err
