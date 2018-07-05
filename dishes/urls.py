from django.conf.urls import url
from dishes import views

urlpatterns = [

    # / --> View all dishes
    url(
        r'^dishes/',
        views.GetDishes.as_view(),
        name="get-dishes"
    ),

    # /dishes/add-dish/ --> Add new dish
    url(
        r'^add-dish/',
        views.AddDish.as_view(),
        name="add-dish"
    ),

    # /dish/2/ --> View dish of id 2
    url(
        r'^dish/(?P<pk>[0-9]+)/$',
        views.GetDish.as_view(),
        name="get-dish"
    ),

    # /dish/2/dish-info/ --> Add extra information of dish of id 2
    url(
        r'^dish/(?P<pk>[0-9]+)/dish-info/',
        views.AddDishInfo.as_view(),
        name="add-dish-info"
    ),
]
