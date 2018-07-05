from restaurant.models import Restaurant, Dish, Plan, PlanItems
from restaurant import serializers
import json


def get_menu():
    plans = Plan.objects.all()
    if (plans is not None):
        plans_data = serializers.PlanSerializer(
            plans,
            many=True
        ).data
        weeks = []
        for plan in plans_data:
            plan['dishes'] = get_plan_items(plan.get('id'))
            plan['restaurant'] = get_restaurant(
                plan.get('restaurant'))
            if plan['week'] not in weeks:
                weeks.append(plan['week'])
        menus = []
        for week in weeks:
            menu = {}
            menu['week'] = week
            plans = Plan.objects.filter(week=week)
            dishes_set = set()
            for plan in plans:
                plan_items = PlanItems.objects.filter(plan=plan)
                for plan_item in plan_items:
                    dish = plan_item.dish
                    if dish not in dishes_set:
                        dish_data = serializers.DishSerializer(
                            dish
                        ).data
                        dishes_set.add(json.dumps(dish_data))
            dishes_list = []
            for dish in dishes_set:
                dishes_list.append(json.loads(dish))
            menu['dishes'] = list(dishes_list)
            menus.append(menu)
    return menus


def get_threedaysplans():
    plans = Plan.objects.filter(plan_type="3day")
    if (plans is not None):
        plans_data = serializers.PlanSerializer(
            plans,
            many=True
        ).data
        for plan in plans_data:
            plan['dishes'] = get_plan_items(plan.get('id'))
            plan['restaurant'] = get_restaurant(
                plan.get('restaurant'))
    return plans_data


def get_fivedaysplans():
    plans = Plan.objects.filter(plan_type="5day")
    if (plans is not None):
        plans_data = serializers.PlanSerializer(
            plans,
            many=True
        ).data
        for plan in plans_data:
            plan['dishes'] = get_plan_items(plan.get('id'))
            plan['restaurant'] = get_restaurant(
                plan.get('restaurant'))
    return plans_data


def get_plan_items(plan):
    plan_items = PlanItems.objects.filter(plan=plan)
    plan_items_data = serializers.PlanItemsSerializer(
        plan_items,
        many=True
    ).data
    plan_items = []
    for plan_item in plan_items_data:
        plan_items.append(get_dish(plan_item.get('dish')))
    return plan_items


def get_dish(id):
    dish = Dish.objects.get(id=id)
    data = {
        'id': id,
        'dish_name': dish.dish_name,
        'description': dish.description,
        'image_url': dish.image_url,
        'price': dish.price
    }
    return data


def get_restaurant(id):
    restaurant = Restaurant.objects.get(id=id)
    restaurant_data = serializers.RestaurantSerializer(
        restaurant
    ).data
    return restaurant_data


def get_plan(plan_id):
    plan = Plan.objects.get(id=plan_id)
    plan_data = serializers.PlanSerializer(plan).data
    restaurant = get_restaurant(plan_data.get('restaurant'))
    plan_data['restaurant'] = restaurant
    plan_items = get_plan_items(plan_id)
    plan_data['dishes'] = plan_items
    return plan_data
