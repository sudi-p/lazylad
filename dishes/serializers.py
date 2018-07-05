from rest_framework.serializers import ModelSerializer
from dishes.models import Dish, Ingredient


class DishSerializer(ModelSerializer):
    class Meta:
        model = Dish
        fields = [
            'id', 'dish_name',
            'price', 'dish_status',
            'short_description',
            'long_description'
        ]


class IngredientsSerializer(ModelSerializer):
    class Meta:
        model = Ingredient
        fields = [
            'id', 'dish',
            'ingredient'
        ]
