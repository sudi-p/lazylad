from restaurant.models import WeeklyMenu, WeeklyMenuItem
from restaurant import serializers
from restaurant import exceptions


def get_weeklymenus():

    weekly_menus = WeeklyMenu.objects.all()
    if not weekly_menus:
        raise exceptions.MenuNotAvailable()

    menus = []
    for weekly_menu in weekly_menus:
        menu = {}
        menu['week'] = weekly_menu.week
        weekly_menu_items = WeeklyMenuItem.objects.filter(
            weeklymenu_id=weekly_menu.id
        )
        menu_items = []
        for weekly_menu_item in weekly_menu_items:
            dish = weekly_menu_item.dish
            dish_data = serializers.DishSerializer(
                dish
            ).data
            dish_data.update({
                'three_day_plan_default': weekly_menu_item.three_day_plan_default,
                'five_day_plan_default': weekly_menu_item.five_day_plan_default,
            })
            menu_items.append(dish_data)

        menu['menu_items'] = menu_items
        menus.append(menu)
    return menus
