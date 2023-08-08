from django.conf.urls import url
from weeklyorder import views

urlpatterns = [
    url(
        r'^get-currentplan/',
        views.get_current_plan,
        name="get_current_plan"
    ),
    url(
        r'^get-upcomingplans/',
        views.get_upcoming_plans,
        name="get_upcoming_plans"
    ),
    url(
        r'^handle-skip/',
        views.handle_skip,
        name="handle_skip"
    ),
    url(
        r'^handle-unskip/',
        views.handle_unskip,
        name="handle_unskip"
    ),
    url(
        r'^save-disheschange/',
        views.save_disheschange,
        name="save_disheschange"
    ),
    url(
        r'^get-deliveryhistory/',
        views.get_deliveryhistory,
        name="get_deliveryhistory"
    ),
]
