from django.conf.urls import url
from customers import views

urlpatterns = [

    url(
        r'^create-customer/',
        views.create_customer,
        name="create-customer"
    ),

    url(
        r'^select-mealplan/',
        views.select_mealplan,
        name="select-mealplan"
    ),

    url(
        r'^complete-signup/',
        views.complete_signup,
        name="complete-signup"
    ),

    url(
        r'^login/',
        views.LogInCustomer.as_view(),
        name="login-customer"
    ),

    url(
        r'^get-appstate/(?P<customer_id>[0-9]+)',
        views.get_appstate,
        name="get-appstate"
    ),

    url(
        r'^get-alluserinformation/',
        views.get_alluserinformation,
        name="get-alluserinformation"
    ),
    url(
        r'^get-subscriptionsinformation/',
        views.get_subscriptionsinformation,
        name="get-subscriptionsinformation"
    ),
    url(
        r'^get-deliveryinformation/',
        views.get_deliveryinformation,
        name="get-deliveryinformation"
    ),
    url(
        r'^get-accountinformation/',
        views.get_accountinformation,
        name="get-accountinformation"
    ),
    url(
        r'^get-paymentinformation/',
        views.get_paymentinformation,
        name="get-paymentinformation"
    ),
    url(
        r'^update-subscription/',
        views.update_subscription,
        name="update-subscription"
    ),
    url(
        r'^update-account/',
        views.update_account,
        name="update-account"
    ),
    url(
        r'^update-delivery/',
        views.update_delivery,
        name="update-delivery"
    ),
    url(
        r'^update-payment/',
        views.update_payment,
        name="update-payment"
    )
]
