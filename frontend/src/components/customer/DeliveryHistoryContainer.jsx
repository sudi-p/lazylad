import React, { Component } from "react";
import DeliveryHistoryView from "./DeliveryHistoryView";
import DeliveryHistoryStore from "../../stores/deliveryHistoryStore";
import CustomerActions from "../../actions/customerActions";
import { Container } from "flux/utils";
import { Consumer } from "../App";

class DeliveryHistory extends Component {
	static getStores() {
		return [DeliveryHistoryStore];
	}
	static calculateState() {
		let state = DeliveryHistoryStore.getState();
		return {
			status: state.get("status"),
			delivered_weeklyorders_list: state.get("delivered_weeklyorders_list")
		};
	}
	componentWillMount() {
		const email = this.props.app_state.user.get("email");
		CustomerActions.getDeliveryHistory(email);
	}
	render() {
		return <DeliveryHistoryView {...this.state} />;
	}
}

const DeliveryHistoryContainer = Container.create(DeliveryHistory);

class DeliveryHistoryWrapper extends Component {
	render() {
		return (
			<Consumer>
				{app_state => <DeliveryHistoryContainer app_state={app_state.state} />}
			</Consumer>
		);
	}
}

export default DeliveryHistoryWrapper;
