from restaurant.models import Restaurant, Dish, Plan, PlanItems
from rest_framework.serializers import ModelSerializer


class RestaurantSerializer(ModelSerializer):
    class Meta:
        model = Restaurant
        fields = [
            'id', 'restaurant_name', 'street_address',
            'rating', 'rating_number', 'open_time',
            'close_time', 'logo_url'
        ]


class DishSerializer(ModelSerializer):
    class Meta:
        model = Dish
        fields = [
            'id', 'dish_name', 'description', 'calorie',
            'price', 'image_url', 'restaurant', 'is_vegeterian'
        ]


class PlanSerializer(ModelSerializer):
    class Meta:
        model = Plan
        fields = [
            'id', 'plan_type', 'restaurant',
            'price', 'week'
        ]


class PlanItemsSerializer(ModelSerializer):
    class Meta:
        model = PlanItems
        fields = [
            'id', 'plan', 'dish'
        ]
