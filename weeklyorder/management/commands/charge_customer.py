from django.core.management.base import BaseCommand
from lazylad.settings import STRIPE_API_KEY
from weeklyorder.models import WeeklyOrder
from customers.models import DeliveryInfo, CustomerPayment, \
    CustomerMealPlan
from customers.controllers import get_customer_by_id
from datetime import date, timedelta
import calendar
import stripe
stripe.api_key = STRIPE_API_KEY


class Command(BaseCommand):

    def charge_customer(self):
        today_day = calendar.day_name[date.today().weekday()]
        chargeable_weeklyorders = WeeklyOrder.objects.filter(
            skipped=False
        ).filter(
            charged=False
        ).filter(
            week_start_date__range=(date.today() - timedelta(7), date.today())
        )
        print chargeable_weeklyorders
        for chargeable_weeklyorder in chargeable_weeklyorders:
            try:
                customer_id = chargeable_weeklyorder.customer_id
                get_customer_by_id(customer_id)
                customer_delivery_info = DeliveryInfo.objects.get(
                    customer_id=customer_id
                )
                if (today_day == customer_delivery_info.delivery_day):
                    customer_payment = CustomerPayment.objects.get(
                        customer_id=customer_id
                    )
                    stripe_customer_id = customer_payment.stripe_customer_id
                    customer_mealplan = CustomerMealPlan.objects.get(
                        customer_id=customer_id
                    )
                    price_shipping = customer_mealplan.price_shipping
                    price_weekly = customer_mealplan.price_weekly
                    # in dollars
                    price_total = float(price_weekly) + float(price_shipping)
                    # in cents
                    price_total = int(price_total * 100)
                    stripe.Charge.create(
                        amount=price_total,
                        currency='usd',
                        customer=stripe_customer_id
                    )
                    chargeable_weeklyorder.charged = True
                    chargeable_weeklyorder.save()
            except Exception as err:
                raise err

    def handle(self, *args, **options):
        self.charge_customer()
