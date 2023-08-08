from restaurant.models import Restaurant, Dish, WeeklyMenu, WeeklyMenuItem
from rest_framework.serializers import ModelSerializer


class RestaurantSerializer(ModelSerializer):
    class Meta:
        model = Restaurant
        fields = [
            'id', 'restaurant_name', 'street_address',
            'phone', 'website', 'yelp_score',
            'link_to_yelp_score', 'foursquare_score',
            'link_to_foursquare_score', 'google_score',
            'link_to_google_score', 'logo_url',
        ]


class DishSerializer(ModelSerializer):
    class Meta:
        model = Dish
        fields = [
            'id', 'dish_name', 'description', 'calorie',
            'image_url', 'restaurant_id',
            'is_vegeterian', 'ingredients_description'
        ]


class WeeklyMenuSerializer(ModelSerializer):
    class Meta:
        model = WeeklyMenu
        fields = [
            'id', 'restaurant_id', 'week',
        ]


class WeeklyMenuItemSerializer(ModelSerializer):
    class Meta:
        model = WeeklyMenuItem
        fields = [
            'id', 'weeklymenu_id',
            'dish', 'three_day_plan_default',
            'five_day_plan_default'
        ]
