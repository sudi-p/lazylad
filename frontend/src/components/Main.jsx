import React from "react";
import { Switch, Route } from "react-router-dom";
import LogInContainer from "./LogInContainer";
import LandingPage from "./LandingPage";
import PageNotFound from "./error/PageNotFound";
import MenuContainer from "./MenuContainer";
import PlansView from "./PlansView";
import "./styles/Main.module.css";
import "./styles/Style.module.css";

const Main = () => (
	<div className="main">
		<Switch>
			<Route exact path="/" component={LandingPage} />
			<Route
				path="/login/"
				component={props => <LogInContainer {...props} />}
			/>
			<Route path="/menu/" component={MenuContainer} />
			<Route path="/mealplans/" component={PlansView} />
			<Route component={PageNotFound} />
		</Switch>
	</div>
);

export default Main;
