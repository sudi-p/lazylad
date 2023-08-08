import React from "react";
import DishCard from "../common/DishCard";
import { Row, Col } from "antd";
import BlueButton from "../common/BlueButton";
import { Link } from "react-router-dom";

const FeaturedMenu = () => {
  const featured_menus = [
    {
      restaurant_name: "Haandi",
      street_address: "NYC",
      dish_list: [
        {
          id: "1",
          image_url:
            "http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529313604/stock-photo-chicken-kabsa-homemade-arabian-biryani-overhead-view-1048188118.png",
          dish_name: "Chicken Biryani",
          description:
            "Fresh diced zucchini and Bengal gram (chana daal) sauteed with tomatoes, onions, and spices.",
          calorie: "700",
          isVegeterian: false
        },
        {
          id: "2",
          image_url:
            "http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529313604/stock-photo-dal-makhani-or-daal-makhni-served-in-a-white-ceramic-bowl-selective-focus-418832788.png",
          dish_name: "Kaala Daal",
          description:
            "Were combining sweet chili sauce and citrusy ponzu a bed of aromatic garlic rice.",
          calorie: "500",
          isVegeterian: true
        },
        {
          id: "3",
          image_url:
            "http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529313604/stock-photo-indian-cooked-spinach-with-raisins-pine-nuts-and-red-pepper-56676241.png",
          dish_name: "Spinach Garlic",
          description:
            "Herby sesame seedstudded zaar gives a vibrant Middle for our salad",
          calorie: "350",
          isVegeterian: true
        }
      ]
    },
    {
      restaurant_name: "Kathmandu",
      street_address: "Queens",
      dish_list: [
        {
          id: "4",
          image_url:
            "http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529313604/stock-photo-traditional-diabetic-fighter-food-bitter-melon-shallow-fry-751425541.png",
          dish_name: "Karela Fry",
          description:
            "Fresh diced zucchini and Bengal gram (chana daal) sauteed with tomatoes, onions, and spices.",
          calorie: "500",
          isVegeterian: true
        },
        {
          id: "5",
          image_url:
            "http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529313604/stock-photo-red-lentil-indian-soup-with-flat-bread-on-a-wooden-background-masoor-dal-309501530.png",
          dish_name: "Rahar Daal",
          description:
            " Herby sesame seedstudded zaar gives a vibrant Middle for our salad",
          calorie: "500",
          isVegeterian: true
        },
        {
          id: "6",
          image_url:
            "http://res.cloudinary.com/dtqxwjmwn/image/upload/v1529313604/stock-photo-green-curry-with-chicken-in-bowl-with-galangal-and-lemon-grass-on-banana-leaf-103104.png",
          dish_name: "Banana Curry",
          description:
            "Were combining sweet chili sauce and citrusy ponzu a bed of aromatic garlic rice.",
          calorie: "350",
          isVegeterian: true
        }
      ]
    }
  ];
  const restaurant_display = featured_menus.map(menu => {
    return (
      <Restaurant
        key={menu.restaurant_name}
        street_address={menu.street_address}
        restaurant_name={menu.restaurant_name}
        dish_list={menu.dish_list}
      />
    );
  });
  return (
    <section className="featured-menu">
      <div className="section_header">
        <span className="section_header--primary">Featured menus</span>
        <span className="section_header--secondary">WEEK of 9TH JUNE</span>
      </div>
      {restaurant_display}
      <div className="button_wrapper">
        <Link to ="/menu/">
          <BlueButton text="Explore more menus" />
        </Link>
      </div>
    </section>
  );
};

const Restaurant = props => {
  let dish_list_display = props.dish_list.map(dish => {
    return (
      <Col
        lg={{ span: 8, offset: 0 }}
        sm={{ span: 12, offset: 0 }}
        xs={{ span: 24, offset: 0 }}
        key={dish.dish_name}
      >
        <DishCard
          image_url={dish.image_url}
          dish_name={dish.dish_name}
          description={dish.description}
          calorie={dish.calorie}
          isVegeterian={dish.isVegeterian}
        />
      </Col>
    );
  });
  return (
    <div className="restaurant-wrapper">
      <div className="restaurant">
        {props.restaurant_name}, {props.street_address}
      </div>
      <Row className="dishes">{dish_list_display}</Row>
    </div>
  );
};

export default FeaturedMenu;
