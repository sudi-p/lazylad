from django.core.management import BaseCommand
from customers.controllers import create_customer, select_mealplan, complete_signup


class Command(BaseCommand):

    def create_customer(self):
        create_customer(
            "sudip@paudel.com",
            "asdfgh",
            "10001"
        )
        select_mealplan(
            "sudip@paudel.com",
            "3",
            "10",
            "50",
            "1"
        )
        complete_signup(
            "sudip@paudel.com",
            "10001",
            "Sudip",
            "Paudel",
            "address_1",
            "address_2",
            "New York City",
            "New York",
            "9840184395",
            "Drop the food in front of the door if no one answers the door",
            "Friday",
            "stripe_token"
        )

    def handle(self, *args, **options):
        self.create_customer()
