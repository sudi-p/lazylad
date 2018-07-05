from django.conf.urls import url
from customers import views

urlpatterns = [

    # user/add-user/ --> Add new user
    url(
        r'^add-customer/',
        views.AddCustomer.as_view(),
        name="add-customer"
    ),
    url(
        r'^check-customer/',
        views.CheckCustomer.as_view(),
        name="check-customer"
    ),

]
