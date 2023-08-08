import React, { Component } from "react";
import { Container } from "flux/utils";
import DeliveryStore from "../../../stores/deliveryStore";
import SettingsActions from "../../../actions/settingsActions";
import DeliveryView from "./Delivery";
import { Consumer } from "../../App";
import { StoreState } from "../../../constants/StoreState";

class Delivery extends Component {
	static getStores() {
		return [DeliveryStore];
	}
	static calculateState(prevState, props) {
		const state = DeliveryStore.getState();
		return {
			status: state.get("status"),
			delivery: state.get("delivery"),
		};
	}
	componentWillMount() {
		const email = this.props.app_state.user.get("email");
		SettingsActions.getDeliveryInformation(email);
	}
	UpdateDelivery = updated_value => {
		const email = this.props.app_state.user.get("email");
		SettingsActions.updateDelivery(email, updated_value);
	};
	render() {
		if (this.state.status === StoreState.READY){
			return (
				<DeliveryView
					{...this.state}
					UpdateDelivery={this.UpdateDelivery}
				/>
			);
		}
		else return null;
	}
}

const DeliveryContainer = Container.create(Delivery);

class DeliveryWrapper extends Component {
	render() {
		return (
			<Consumer>
				{app_state => <DeliveryContainer app_state={app_state.state} />}
			</Consumer>
		);
	}
}

export default DeliveryWrapper;
