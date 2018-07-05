from django.conf.urls import url
from restaurant import views

urlpatterns = [

    # restaurants/get-restaurants/ --> Add new user
    url(
        r'^get-plans/',
        views.GetMenu.as_view(),
        name="get-plans"
    ),
    url(
        r'^get-threedaysplans/',
        views.GetThreeDaysPlans.as_view(),
        name="get-threedaysplans"
    ),
    url(
        r'^get-fivedaysplans/',
        views.GetFiveDaysPlans.as_view(),
        name="get-fivedaysplans"
    ),
    url(
        r'^get-plan/(?P<pk>[0-9]+)/',
        views.GetPlan.as_view(),
        name="get-plan"
    ),
    url(
        r'^dish/(?P<pk>[0-9]+)/$',
        views.GetDish.as_view(),
        name="get-dish"
    ),

]
