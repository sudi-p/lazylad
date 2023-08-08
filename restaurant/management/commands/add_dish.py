from django.core.management.base import BaseCommand
from restaurant.models import Dish


class Command(BaseCommand):

    def add_dishes(self):
        Dish.objects.create(
            dish_name="Idiyappam",
            description="A specialty from God's own Country, Kerala, this light, soft hopper is great with stews and curry's and is rather versatile in the fact that it can make an appearance at any meal time.",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/0*EQ_noffelbBkbGDd.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="650"
        )

    def handle(self, *args, **options):
        self.add_dishes()
