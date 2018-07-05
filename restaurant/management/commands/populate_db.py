from django.core.management.base import BaseCommand
from restaurant.models import Restaurant, Dish, Plan, PlanItems


class Command(BaseCommand):

    def _create_restaurants(self):
        Restaurant.objects.create(
            id='1',
            restaurant_name='RedLentils',
            street_address='21 B New York',
            rating='4',
            rating_number='200',
            open_time='10:00:00',
            close_time='23:00:00'
        )

    def _create_dish(self):
        redlentils = Restaurant.objects.get(id=1)
        Dish.objects.create(
            id='1',
            dish_name="Paneer Kofta",
            description="bilaterally distinguished Paneer in tramautized ultimated syrup of awesomeness.",
            price="6",
            image_url="https://www.ndtv.com/cooks/images/paneer%20kofta%20new.jpg",
            restaurant=redlentils,
            is_vegeterian=True,
            calorie="700"
        )

        Dish.objects.create(
            id='2',
            dish_name="Paneer Bhurji Masala",
            description="Crushed paneer cooked with warm spices, fresh tomatoes, turmeric, and onions.",
            price="7",
            image_url="http://zaykakatadka.com/wp-content/uploads/2018/05/IMG_20180516_115855.jpg",
            restaurant=redlentils,
            is_vegeterian=True,
            calorie="700"
        )

        Dish.objects.create(
            id='3',
            dish_name="Turai Chana Daal",
            description="Fresh diced zucchini and Bengal gram (chana daal) sauteed with tomatoes, onions, and spices.",
            price="3",
            image_url="http://www.tasterocks.com/wp-content/uploads/2014/05/ChannaDal5.jpg",
            restaurant=redlentils,
            is_vegeterian=True,
            calorie="700"
        )

        Dish.objects.create(
            id='4',
            dish_name="Veg Salna",
            description="A mix of vegetables sauteed with spices and cooked in a South Indian gravy with poppy seeds, cashews, and coconut.",
            price="5",
            image_url="https://www.subbuskitchen.com/wp-content/uploads/2014/03/Parota-Salna_Final2-1.jpg",
            restaurant=redlentils,
            is_vegeterian=True,
            calorie="780"
        )

        Dish.objects.create(
            id='5',
            dish_name="Punjabi Lobhia",
            description="Black-eyed peas cooked with onions, tomatoes, ginger, and traditional North Indian spices.",
            price="6",
            image_url="https://img.werecipes.com/wp/wp-content/uploads/2015/02/lobia-curry-recipe-dry-feenugreek.jpg",
            restaurant=redlentils,
            is_vegeterian=True,
            calorie="360"
        )

        Dish.objects.create(
            id='6',
            dish_name="Tridali Daal",
            description="A hearty blend of 3 lentils tempered with traditional spices and onions.",
            price="2.5",
            image_url="https://www.sindhidunya.com/wp-content/uploads/2017/11/tidali.png",
            restaurant=redlentils,
            is_vegeterian=True,
            calorie="500"
        )

        Dish.objects.create(
            id='7',
            dish_name="Tahini Chicken",
            description="Khatara Chicken",
            price="6",
            image_url="https://media.blueapron.com/recipes/3008/square_newsletter_images/1527092258-1-0003-2443/0625_2PP_Chicken-Crispy-Potatoes_8307_WEB_SQ_hi_res.jpg",
            restaurant=redlentils,
            is_vegeterian=False,
            calorie="450"
        )

        Dish.objects.create(
            id='8',
            dish_name="Seared Steaks & Miso Butter",
            description="We topping these steaks with a duo of irresistibly rich toppings sweet soy glaze and butter mixed with savory miso",
            price="6.5",
            image_url="https://media.blueapron.com/recipes/3026/square_newsletter_images/1527092952-1-0010-1306/0625_2PM_Seared-Steak_8363_WEB_SQ_hi_res.jpg",
            restaurant=redlentils,
            is_vegeterian=False,
            calorie="300"
        )

        Dish.objects.create(
            id='9',
            dish_name="Sweet Chili Beef",
            description="Were combining sweet chili sauce and citrusy ponzu a bed of aromatic garlic rice.",
            price="9",
            image_url="https://media.blueapron.com/recipes/3121/square_newsletter_images/1527796241-1-0006-6308/0702_2PM_Black-Pepper-Beef_9121_WEB_SQ_hi_res.jpg",
            restaurant=redlentils,
            is_vegeterian=True,
            calorie="700"
        )

        Dish.objects.create(
            id='10',
            dish_name="Zaatar-Spiced Barramundi",
            description="Herby sesame seedstudded zaar gives a vibrant Middle for our salad",
            price="6.5",
            image_url="https://media.blueapron.com/recipes/3020/square_newsletter_images/1527092857-1-0007-7564/0625_2PF_Barramundi_8486_WEB_SQ_hi_res.jpg",
            restaurant=redlentils,
            is_vegeterian=False,
            calorie="750"
        )
        Dish.objects.create(
            id='11',
            dish_name="Karela Fry",
            description="Tito tito karela fry garesi jhurum jhurum",
            price="3.5",
            image_url="http://www.freeindianrecipes.com/wp-content/uploads/Karela-Fry-Recipe.jpg",
            restaurant=redlentils,
            is_vegeterian=True,
            calorie="650"
        )

    def _create_plans(self):
        redlentils = Restaurant.objects.get(id=1)
        Plan.objects.create(
            id='1',
            restaurant=redlentils,
            plan_type="3day",
            price="100",
            week="2018-06-25",
        )
        Plan.objects.create(
            id='2',
            restaurant=redlentils,
            plan_type="5day",
            price="150",
            week="2018-06-25",
        )
        Plan.objects.create(
            id='3',
            restaurant=redlentils,
            plan_type="3day",
            price="100",
            week="2018-07-02",
        )
        Plan.objects.create(
            id='4',
            restaurant=redlentils,
            plan_type="5day",
            price="150",
            week="2018-07-02",
        )

    def _create_planitems(self):
        plan1 = Plan.objects.get(id=1)
        plan2 = Plan.objects.get(id=2)
        plan3 = Plan.objects.get(id=3)
        plan4 = Plan.objects.get(id=4)
        dish1 = Dish.objects.get(id=1)
        dish2 = Dish.objects.get(id=2)
        dish3 = Dish.objects.get(id=3)
        dish4 = Dish.objects.get(id=4)
        dish5 = Dish.objects.get(id=5)
        dish6 = Dish.objects.get(id=6)
        dish7 = Dish.objects.get(id=7)
        dish8 = Dish.objects.get(id=8)
        dish9 = Dish.objects.get(id=9)
        dish10 = Dish.objects.get(id=10)
        dish11 = Dish.objects.get(id=11)

        PlanItems.objects.create(
            id="1",
            plan=plan1,
            dish=dish10
        )
        PlanItems.objects.create(
            id="2",
            plan=plan1,
            dish=dish8
        )
        PlanItems.objects.create(
            id="3",
            plan=plan1,
            dish=dish11
        )
        PlanItems.objects.create(
            id="4",
            plan=plan2,
            dish=dish1
        )
        PlanItems.objects.create(
            id="5",
            plan=plan2,
            dish=dish3
        )
        PlanItems.objects.create(
            id="6",
            plan=plan2,
            dish=dish5
        )
        PlanItems.objects.create(
            id="7",
            plan=plan2,
            dish=dish8
        )
        PlanItems.objects.create(
            id="8",
            plan=plan2,
            dish=dish10
        )
        PlanItems.objects.create(
            id="9",
            plan=plan3,
            dish=dish9
        )
        PlanItems.objects.create(
            id="10",
            plan=plan3,
            dish=dish7
        )
        PlanItems.objects.create(
            id="11",
            plan=plan3,
            dish=dish6
        )
        PlanItems.objects.create(
            id="12",
            plan=plan4,
            dish=dish2
        )
        PlanItems.objects.create(
            id="13",
            plan=plan4,
            dish=dish4
        )
        PlanItems.objects.create(
            id="14",
            plan=plan4,
            dish=dish6
        )
        PlanItems.objects.create(
            id="15",
            plan=plan4,
            dish=dish7
        )
        PlanItems.objects.create(
            id="16",
            plan=plan4,
            dish=dish9
        )

    def _empty_db(self):
        PlanItems.objects.all().delete()
        Plan.objects.all().delete()
        Dish.objects.all().delete()
        Restaurant.objects.all().delete()

    def handle(self, *args, **options):
        self._empty_db()
        self._create_restaurants()
        self._create_dish()
        self._create_plans()
        self._create_planitems()
