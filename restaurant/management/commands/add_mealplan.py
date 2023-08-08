from django.core.management.base import BaseCommand
from customers.models import Customer, CustomerRestaurant, CustomerMealPlan
from weeklyorder.models import WeeklyOrder, WeeklyOrderItem
from restaurant.models import Dish, WeeklyMenu, WeeklyMenuItem


class Command(BaseCommand):

    def add_mealplan(self):
        dish_1 = Dish.objects.get(id=1)
        dish_2 = Dish.objects.get(id=2)
        dish_3 = Dish.objects.get(id=3)
        dish_4 = Dish.objects.get(id=4)
        dish_5 = Dish.objects.get(id=5)
        dish_6 = Dish.objects.get(id=6)
        dish_7 = Dish.objects.get(id=7)
        dish_8 = Dish.objects.get(id=8)
        dish_9 = Dish.objects.get(id=9)
        dish_10 = Dish.objects.get(id=10)
        dish_11 = Dish.objects.get(id=11)
        dish_12 = Dish.objects.get(id=12)
        dish_13 = Dish.objects.get(id=13)
        dish_14 = Dish.objects.get(id=14)
        dish_15 = Dish.objects.get(id=15)
        dish_16 = Dish.objects.get(id=16)
        dish_17 = Dish.objects.get(id=17)
        dish_18 = Dish.objects.get(id=18)
        dish_19 = Dish.objects.get(id=19)
        dish_20 = Dish.objects.get(id=20)
        dish_21 = Dish.objects.get(id=21)
        dish_22 = Dish.objects.get(id=22)
        dish_23 = Dish.objects.get(id=23)
        dish_24 = Dish.objects.get(id=24)
        week = "2018-10-08"
        restaurant_id = "1"
        weeklymenu = WeeklyMenu.objects.filter(
            week=week
        ).filter(
            restaurant_id=restaurant_id
        )
        if not weeklymenu:
            weeklymenu = WeeklyMenu.objects.create(
                restaurant_id=restaurant_id,
                week=week
            )
            WeeklyMenuItem.objects.create(
                dish=dish_1,
                weeklymenu_id=weeklymenu.id,
                three_day_plan_default=True,
                five_day_plan_default=False,
            )
            WeeklyMenuItem.objects.create(
                dish=dish_3,
                weeklymenu_id=weeklymenu.id,
                three_day_plan_default=True,
                five_day_plan_default=False,
            )
            WeeklyMenuItem.objects.create(
                dish=dish_22,
                weeklymenu_id=weeklymenu.id,
                three_day_plan_default=True,
                five_day_plan_default=True,
            )
            WeeklyMenuItem.objects.create(
                dish=dish_15,
                weeklymenu_id=weeklymenu.id,
                three_day_plan_default=False,
                five_day_plan_default=True,
            )
            WeeklyMenuItem.objects.create(
                dish=dish_18,
                weeklymenu_id=weeklymenu.id,
                three_day_plan_default=False,
                five_day_plan_default=True,
            )
            WeeklyMenuItem.objects.create(
                dish=dish_21,
                weeklymenu_id=weeklymenu.id,
                three_day_plan_default=False,
                five_day_plan_default=True,
            )
            WeeklyMenuItem.objects.create(
                dish=dish_7,
                weeklymenu_id=weeklymenu.id,
                three_day_plan_default=False,
                five_day_plan_default=True,
            )
        else:
            return

        restaurant_customers = CustomerRestaurant.objects.filter(
            restaurant_id=weeklymenu.restaurant_id
        )
        for customer in restaurant_customers:
            customer = Customer.objects.get(id=customer.customer_id)
            customer_mealplan = CustomerMealPlan.objects.get(
                customer_id=customer.id
            )
            weeklyorder = WeeklyOrder.objects.create(
                customer_id=customer.id,
                weeklymenu_id=weeklymenu.id,
                week_start_date=weeklymenu.week,
                restaurant_id=weeklymenu.restaurant_id
            )
            if (customer_mealplan.number_of_dishes == "3"):
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

    def handle(self, *args, **options):
        self.add_mealplan()
