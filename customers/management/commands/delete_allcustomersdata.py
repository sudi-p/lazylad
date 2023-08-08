from django.core.management import BaseCommand
from customers.models import Customer, CustomerRestaurant, \
    CustomerPayment, DeliveryInfo, CustomerFoodPreferences, CustomerMealPlan
from weeklyorder.models import WeeklyOrder, WeeklyOrderItem


class Command(BaseCommand):

    def delete_customers(self):
        CustomerMealPlan.objects.all().delete()
        CustomerRestaurant.objects.all().delete()
        CustomerPayment.objects.all().delete()
        DeliveryInfo.objects.all().delete()
        CustomerFoodPreferences.objects.all().delete()
        Customer.objects.all().delete()
        WeeklyOrder.objects.all().delete()
        WeeklyOrderItem.objects.all().delete()

    def handle(self, *args, **options):
        self.delete_customers()
