from django.conf.urls import url
from restaurant import views

urlpatterns = [

    # restaurants/get-restaurants/ --> Add new user
    url(
        r'^get-plans/',
        views.get_weeklymenus,
        name="get-plans"
    ),

]
