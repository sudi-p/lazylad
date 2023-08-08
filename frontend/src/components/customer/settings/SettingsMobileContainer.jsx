import React, { Component } from "react";
import { Container } from "flux/utils";
import SettingsStore from "../../../stores/settingsStore";
import SettingsActions from "../../../actions/settingsActions";
import SettingsMobileView from "./SettingsMobileView";
import { Consumer } from "../../App";

class Settings extends Component {
	static getStores() {
		return [SettingsStore];
	}
	static calculateState(prevState, props) {
		const state = SettingsStore.getState();
		return {
			status: state.get("status"),
			account: state.get("account"),
			delivery: state.get("delivery"),
			subscription: state.get("subscription"),
			payment: state.get("payment")
		};
	}
	componentWillMount() {
		const email = this.props.app_state.user.get("email");
		SettingsActions.getAllUserInformation(email);
	}
	UpdateSubscription = updated_value => {
		const email = this.props.app_state.user.get("email");
		SettingsActions.updateSubscription(email, updated_value);
		SettingsActions.getAllUserInformation(email);
	};
	UpdateAccount = updated_value => {
		const email = this.props.app_state.user.get("email");
		SettingsActions.updateAccount(email, updated_value);
		SettingsActions.getAllUserInformation(email);
	};
	UpdateDelivery = updated_value => {
		const email = this.props.app_state.user.get("email");
		SettingsActions.updateDelivery(email, updated_value);
		SettingsActions.getAllUserInformation(email);
	};
	UpdatePayment = updated_value => {
		const email = this.props.app_state.user.get("email");
		SettingsActions.updatePayment(email, updated_value);
		SettingsActions.getAllUserInformation(email);
	};
	render() {
		return (
			<SettingsMobileView
				{...this.state}
				UpdateSubscription={this.UpdateSubscription}
				UpdateAccount={this.UpdateAccount}
				UpdatePayment={this.UpdatePayment}
				UpdateDelivery={this.UpdateDelivery}
			/>
		);
	}
}

const SettingsContainer = Container.create(Settings);

class SettingsWrapper extends Component {
	render() {
		return (
			<Consumer>
				{app_state => <SettingsContainer app_state={app_state.state} />}
			</Consumer>
		);
	}
}

export default SettingsWrapper;
