import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./restaurant/Home";
//import DishesContainer from "./DishesContainer";
import PageNotFound from "./error/PageNotFound";

import "./styles/Main.module.css";

const MainRestaurant = () => (
	<main className="main">
		<Switch>
			<Route path="/restaurant/" component={Home} />
			<Route component={PageNotFound} />
		</Switch>
	</main>
);

export default MainRestaurant;
