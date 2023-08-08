from django.core.management.base import BaseCommand
from restaurant.models import Restaurant, Dish, WeeklyMenu, WeeklyMenuItem


class Command(BaseCommand):

    def _create_restaurants(self):
        Restaurant.objects.create(
            id='1',
            restaurant_name='Red Lentils',
            street_address='21 B New York',
            phone='9840184395',
            website='www.1.com',
            yelp_score=4,
            link_to_yelp_score="www.yelp.com",
            foursquare_score=4,
            link_to_foursquare_score="www.foursquare.com",
            google_score=4,
            link_to_google_score="www.google.com",
            logo_url="http://res.cloudinary.com/dtqxwjmwn/image/upload/v1531475193/real_logo2.png"
        )

    def _create_dish(self):
        Dish.objects.create(
            id='1',
            dish_name="Paneer Kofta",
            description="bilaterally distinguished Paneer in tramautized ultimated syrup of awesomeness.",
            ingredients_description="some ingredients_description",
            image_url="https://www.ndtv.com/cooks/images/paneer%20kofta%20new.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="700"
        )

        Dish.objects.create(
            id='2',
            dish_name="Paneer Bhurji Masala",
            description="Crushed paneer cooked with warm spices, fresh tomatoes, turmeric, and onions.",
            ingredients_description="some ingredients_description",
            image_url="http://zaykakatadka.com/wp-content/uploads/2018/05/IMG_20180516_115855.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="700"
        )

        Dish.objects.create(
            id='3',
            dish_name="Turai Chana Daal",
            description="Fresh diced zucchini and Bengal gram (chana daal) sauteed with tomatoes, onions, and spices.",
            ingredients_description="some ingredients_description",
            image_url="http://www.tasterocks.com/wp-content/uploads/2014/05/ChannaDal5.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="700"
        )

        Dish.objects.create(
            id='4',
            dish_name="Veg Salna",
            description="A mix of vegetables sauteed with spices and cooked in a South Indian gravy with poppy seeds, cashews, and coconut.",
            ingredients_description="some ingredients_description",
            image_url="https://www.subbuskitchen.com/wp-content/uploads/2014/03/Parota-Salna_Final2-1.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="780"
        )

        Dish.objects.create(
            id='5',
            dish_name="Punjabi Lobhia",
            description="Black-eyed peas cooked with onions, tomatoes, ginger, and traditional North Indian spices.",
            ingredients_description="some ingredients_description",
            image_url="https://img.werecipes.com/wp/wp-content/uploads/2015/02/lobia-curry-recipe-dry-feenugreek.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="360"
        )

        Dish.objects.create(
            id='6',
            dish_name="Tridali Daal",
            description="A hearty blend of 3 lentils tempered with traditional spices and onions.",
            ingredients_description="some ingredients_description.5",
            image_url="https://www.sindhidunya.com/wp-content/uploads/2017/11/tidali.png",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="500"
        )

        Dish.objects.create(
            id='7',
            dish_name="Tahini Chicken",
            description="Khatara Chicken",
            ingredients_description="some ingredients_description",
            image_url="https://media.blueapron.com/recipes/3008/square_newsletter_images/1527092258-1-0003-2443/0625_2PP_Chicken-Crispy-Potatoes_8307_WEB_SQ_hi_res.jpg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="450"
        )

        Dish.objects.create(
            id='8',
            dish_name="Seared Steaks & Miso Butter",
            description="We topping these steaks with a duo of irresistibly rich toppings sweet soy glaze and butter mixed with savory miso",
            ingredients_description="some ingredients_description.5",
            image_url="https://media.blueapron.com/recipes/3026/square_newsletter_images/1527092952-1-0010-1306/0625_2PM_Seared-Steak_8363_WEB_SQ_hi_res.jpg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="300"
        )

        Dish.objects.create(
            id='9',
            dish_name="Sweet Chili Beef",
            description="Were combining sweet chili sauce and citrusy ponzu a bed of aromatic garlic rice.",
            ingredients_description="some ingredients_description",
            image_url="https://media.blueapron.com/recipes/3121/square_newsletter_images/1527796241-1-0006-6308/0702_2PM_Black-Pepper-Beef_9121_WEB_SQ_hi_res.jpg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="700"
        )

        Dish.objects.create(
            id='10',
            dish_name="Zaatar-Spiced Barramundi",
            description="Herby sesame seedstudded zaar gives a vibrant Middle for our salad",
            ingredients_description="some ingredients_description.5",
            image_url="https://media.blueapron.com/recipes/3020/square_newsletter_images/1527092857-1-0007-7564/0625_2PF_Barramundi_8486_WEB_SQ_hi_res.jpg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="750"
        )
        Dish.objects.create(
            id='11',
            dish_name="Karela Fry",
            description="Tito tito karela fry garesi jhurum jhurum",
            ingredients_description="some ingredients_description.5",
            image_url="http://www.freeindianrecipes.com/wp-content/uploads/Karela-Fry-Recipe.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="650"
        )
        Dish.objects.create(
            id='12',
            dish_name="Aloo Paratha",
            description="It is packed with carbs and is the ideal way to start the day for the hardworking farmers up north",
            ingredients_description="some ingredients_description.5",
            image_url="https://cdn-images-1.medium.com/max/800/0*gMxBDbMRUVUcwrzo.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="650"
        )
        Dish.objects.create(
            id='13',
            dish_name="Baingan Bharta",
            description="power packed dish with smoked and mashed eggplants in a mildly spiced, onion-tomato gravy.",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/0*2k3oJvM0-ligwnoB.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="650"
        )
        Dish.objects.create(
            id='14',
            dish_name="Dosa",
            description="Crispy crepes served with spicy lentil curry and chutneys of so many varieties",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/1*-vMts54pO4RyEzYY0fNS_Q.jpeg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="650"
        )
        Dish.objects.create(
            id='15',
            dish_name="Egg Curry",
            description="Amazingly versatile, the egg curry can be found on a Keralaite breakfast table with Idiyappams, or for lunch with hot rice and poppadams or in the evening with soft wheat breads.",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/1*_yqHH7g0shw0z97CtLWPSA.jpeg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="650"
        )
        Dish.objects.create(
            id='16',
            dish_name="Hyderabadi Biryani",
            description="Layers of rice and spicy meat sealed with a dough and cooked with the heady notes of saffron, a meal fit for the kings.",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/0*T0ll-NDs7b10YjWS.jpg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="650"
        )
        Dish.objects.create(
            id='17',
            dish_name="Idiyappam",
            description="A specialty from God's own Country, Kerala, this light, soft hopper is great with stews and curry's and is rather versatile in the fact that it can make an appearance at any meal time.",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/0*EQ_noffelbBkbGDd.jpg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="650"
        )
        Dish.objects.create(
            id='18',
            dish_name="Karimeen Fry",
            description="The super soft fish takes on the masalas flavour and is a delight with some brown rice and local toddy!",
            ingredients_description="some ingredients_description.5",
            image_url="https://cdn-images-1.medium.com/max/800/0*yUpA0PFp0nnAgkrP.jpg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="650"
        )
        Dish.objects.create(
            id='19',
            dish_name="Murghir Bhorta ",
            description="Chicken, ground into a paste and fried with a host of spices in mustard oil, on a low flame, for the longest time, and finished off with a drizzle of raw mustard oil, for that extra kick.",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/1*aHvLgZlOHzF6gwx6EX_-mQ.jpeg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="650"
        )
        Dish.objects.create(
            id='20',
            dish_name="Paneer Makhni",
            description="Cottage cheese cooked in butter, with a cashew nut based gravy.",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/1*dEETf3GRVsGehLUCpSXE5g.jpeg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="650"
        )
        Dish.objects.create(
            id='21',
            dish_name="Thayir Sadam",
            description="Rice cooked and mixed with yoghurt, mustard seeds and veggies, this is the recipe that combines ease, health and nutrition.",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/1*PSr6s-o-JGO3UsVtj4aERw.jpeg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="650"
        )
        Dish.objects.create(
            id='22',
            dish_name="Vada Pav",
            description="Indian Burger, this is the ultimate Maharashtrian street food. Spiced Potato Fritters in spongy buns with a chutney sauce. ",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/1*XicpzNknM3IiiubhzYhOvg.jpeg",
            restaurant_id=1,
            is_vegeterian=True,
            calorie="650"
        )
        Dish.objects.create(
            id='23',
            dish_name="Xacuti",
            description="Chicken Cooked in Spiced Ground Coconut.Goan food is known for its coastal influence.",
            ingredients_description="some ingredients_description",
            image_url="https://cdn-images-1.medium.com/max/800/1*NU0pzcw_9rQYCYERRINv_g.jpeg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="650"
        )
        Dish.objects.create(
            id='24',
            dish_name="Zafrani Golda Chingri ",
            description="Creamy Tiger Prawns infused with Saffron.Zafrani, means anything with saffron in it. Which also means pure indulgence. ",
            ingredients_description="some ingredients_description.5",
            image_url="https://cdn-images-1.medium.com/max/800/1*B90aWw09fxES-Mi5pqG_FQ.jpeg",
            restaurant_id=1,
            is_vegeterian=False,
            calorie="650"
        )

    def _create_weeklymenu(self):

        WeeklyMenu.objects.create(
            id="1",
            restaurant_id="1",
            week="2018-11-19"
        )

        WeeklyMenu.objects.create(
            id="2",
            restaurant_id="1",
            week="2018-11-26"
        )

        WeeklyMenu.objects.create(
            id="3",
            restaurant_id="1",
            week="2018-12-03"
        )

        WeeklyMenu.objects.create(
            id="4",
            restaurant_id="1",
            week="2018-12-10"
        )

    def _create_weeklymenuitem(self):
        dish_1 = Dish.objects.get(id=1)
        dish_2 = Dish.objects.get(id=2)
        dish_3 = Dish.objects.get(id=3)
        dish_4 = Dish.objects.get(id=4)
        dish_5 = Dish.objects.get(id=5)
        dish_6 = Dish.objects.get(id=6)
        dish_7 = Dish.objects.get(id=7)
        dish_8 = Dish.objects.get(id=8)
        dish_9 = Dish.objects.get(id=9)
        dish_10 = Dish.objects.get(id=10)
        dish_11 = Dish.objects.get(id=11)
        dish_12 = Dish.objects.get(id=12)
        dish_13 = Dish.objects.get(id=13)
        dish_14 = Dish.objects.get(id=14)
        dish_15 = Dish.objects.get(id=15)
        dish_16 = Dish.objects.get(id=16)
        dish_17 = Dish.objects.get(id=17)
        dish_18 = Dish.objects.get(id=18)
        dish_19 = Dish.objects.get(id=19)
        dish_20 = Dish.objects.get(id=20)
        dish_21 = Dish.objects.get(id=21)
        dish_22 = Dish.objects.get(id=22)
        dish_23 = Dish.objects.get(id=23)
        dish_24 = Dish.objects.get(id=24)

        WeeklyMenuItem.objects.create(
            id="1",
            dish=dish_1,
            weeklymenu_id=1,
            three_day_plan_default=True,
            five_day_plan_default=False,
        )
        WeeklyMenuItem.objects.create(
            id="2",
            dish=dish_5,
            weeklymenu_id=1,
            three_day_plan_default=True,
            five_day_plan_default=False,
        )
        WeeklyMenuItem.objects.create(
            id="3",
            dish=dish_9,
            weeklymenu_id=1,
            three_day_plan_default=True,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="4",
            dish=dish_13,
            weeklymenu_id=1,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="5",
            dish=dish_17,
            weeklymenu_id=1,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="6",
            dish=dish_21,
            weeklymenu_id=1,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="7",
            dish=dish_3,
            weeklymenu_id=1,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="8",
            dish=dish_2,
            weeklymenu_id=2,
            three_day_plan_default=True,
            five_day_plan_default=False,
        )
        WeeklyMenuItem.objects.create(
            id="9",
            dish=dish_6,
            weeklymenu_id=2,
            three_day_plan_default=True,
            five_day_plan_default=False,
        )
        WeeklyMenuItem.objects.create(
            id="10",
            dish=dish_10,
            weeklymenu_id=2,
            three_day_plan_default=True,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="11",
            dish=dish_14,
            weeklymenu_id=2,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="12",
            dish=dish_18,
            weeklymenu_id=2,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="13",
            dish=dish_22,
            weeklymenu_id=2,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="14",
            dish=dish_4,
            weeklymenu_id=2,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="15",
            dish=dish_3,
            weeklymenu_id=3,
            three_day_plan_default=True,
            five_day_plan_default=False,
        )
        WeeklyMenuItem.objects.create(
            id="16",
            dish=dish_7,
            weeklymenu_id=3,
            three_day_plan_default=True,
            five_day_plan_default=False,
        )
        WeeklyMenuItem.objects.create(
            id="17",
            dish=dish_11,
            weeklymenu_id=3,
            three_day_plan_default=True,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="18",
            dish=dish_15,
            weeklymenu_id=3,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="19",
            dish=dish_19,
            weeklymenu_id=3,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="20",
            dish=dish_23,
            weeklymenu_id=3,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="21",
            dish=dish_2,
            weeklymenu_id=3,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="22",
            dish=dish_4,
            weeklymenu_id=4,
            three_day_plan_default=True,
            five_day_plan_default=False,
        )
        WeeklyMenuItem.objects.create(
            id="23",
            dish=dish_8,
            weeklymenu_id=4,
            three_day_plan_default=True,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="24",
            dish=dish_12,
            weeklymenu_id=4,
            three_day_plan_default=True,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="25",
            dish=dish_16,
            weeklymenu_id=4,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="26",
            dish=dish_20,
            weeklymenu_id=4,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )
        WeeklyMenuItem.objects.create(
            id="27",
            dish=dish_24,
            weeklymenu_id=4,
            three_day_plan_default=False,
            five_day_plan_default=True,
        )

    def _empty_db(self):
        WeeklyMenuItem.objects.all().delete()
        WeeklyMenu.objects.all().delete()
        Dish.objects.all().delete()
        Restaurant.objects.all().delete()

    def handle(self, *args, **options):
        self._empty_db()
        self._create_restaurants()
        self._create_dish()
        self._create_weeklymenu()
        self._create_weeklymenuitem()
