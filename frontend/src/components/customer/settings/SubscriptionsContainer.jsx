import React, { Component } from "react";
import { Container } from "flux/utils";
import SubscriptionStore from "../../../stores/subscriptionStore";
import SettingsActions from "../../../actions/settingsActions";
import SubscriptionsView from "./Subscriptions";
import { Consumer } from "../../App";
import { StoreState } from "../../../constants/StoreState";

class Subscriptions extends Component {
	static getStores() {
		return [SubscriptionStore];
	}
	static calculateState(prevState, props) {
		const state = SubscriptionStore.getState();
		return {
			status: state.get("status"),
			subscription: state.get("subscription"),
		};
	}
	componentWillMount() {
		const email = this.props.app_state.user.get("email");
		SettingsActions.getSubscriptionsInformation(email);
	}
	UpdateSubscription = updated_value => {
		const email = this.props.app_state.user.get("email");
		SettingsActions.updateSubscription(email, updated_value);
	};
	render() {
		if (this.state.status === StoreState.READY){
			return (
				<SubscriptionsView
					{...this.state}
					UpdateSubscription={this.UpdateSubscription}
				/>
			);
		}
		else return null;
	}
}

const SubscriptionsContainer = Container.create(Subscriptions);

class SubscriptionsWrapper extends Component {
	render() {
		return (
			<Consumer>
				{app_state => <SubscriptionsContainer app_state={app_state.state} />}
			</Consumer>
		);
	}
}

export default SubscriptionsWrapper;
