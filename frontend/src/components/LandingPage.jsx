import React from "react";
import Processes from "./landingpage/Process";
import Hero from "./landingpage/Hero";
import Pricing from "./landingpage/Pricing";
import Why from "./landingpage/Why";
import FeaturedMenus from "./landingpage/FeaturedMenus";
import "./styles/LandingPage.module.css";

const LandingPage = () => (
	<div className="landing">
		<Hero />
		<Pricing />
		<FeaturedMenus />
		<Why />
		<Processes />
	</div>
);

export default LandingPage;
