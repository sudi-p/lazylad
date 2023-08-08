import React from "react";
import RestaurantHeader from "./headers/RestaurantHeader";
import MainRestaurant from "./MainRestaurant";
import "./styles/LoggedInRestaurantView.module.css";

const LoggedInRestaurantView = props =>{
  return(
    <div className="restaurant">
      <RestaurantHeader />
      <MainRestaurant />
    </div>
  )
}

export default LoggedInRestaurantView;