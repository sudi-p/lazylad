from dishes.models import Dish, Ingredient
from dishes import serializers


def get_dish(dish_id):
    dish = Dish.objects.get(id=dish_id)
    dish_data = serializers.DishSerializer(
        dish
    ).data
    ingredients = get_ingredients(dish_id)
    dish_data['ingredients'] = ingredients
    return dish_data


def get_ingredients(dish_id=None):
    ingredients = Ingredient.objects.all()
    if dish_id is not None:
        ingredients = ingredients.filter(dish_id=dish_id)
    return serializers.IngredientsSerializer(ingredients, many=True).data


def get_dishes():
    dishes = Dish.objects.all()
    return serializers.DishSerializer(dishes, many=True).data


def add_dish(new_dish):
    dish_name = new_dish.get('dish_name')
    price = new_dish.get('price')
    new_dish = Dish.objects.create(
        dish_name=dish_name,
        price=price,
        dish_status=1
    )
    return serializers.DishSerializer(new_dish).data


def add_dish_info(dish_id, short_description, long_description, ingredients):
    dish = Dish.objects.get(id=dish_id)
    if (len(ingredients) >= 1):
        add_ingredients(dish, ingredients)
    dish.short_description = short_description
    dish.long_description = long_description
    dish.dish_status = 2
    dish.save()


def add_ingredients(dish, ingredients):
    for ingredient in ingredients:
        ingredient.objects.create(
            dish=dish,
            ingredient=ingredient
        )
