import React from "react";
import CurrentHero from "./CurrentHero";
import CurrentMenu from "./CurrentMenu";
import { StoreState } from "../../constants/StoreState";

const CurrentMenuView = props => {
	if (props.status === StoreState.LOADIG) {
		return <div className="loading" />;
	} else {
		return (
			<React.Fragment>
				<CurrentHero />
				<CurrentMenu {...props} />
			</React.Fragment>
		);
	}
};

export default CurrentMenuView;
