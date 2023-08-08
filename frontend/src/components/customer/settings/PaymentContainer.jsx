import React, { Component } from "react";
import { Container } from "flux/utils";
import PaymentStore from "../../../stores/paymentStore";
import SettingsActions from "../../../actions/settingsActions";
import PaymentView from "./Payment";
import { Consumer } from "../../App";
import { StoreState } from "../../../constants/StoreState";

class Payment extends Component {
	static getStores() {
		return [PaymentStore];
	}
	static calculateState(prevState, props) {
		const state = PaymentStore.getState();
		return {
			status: state.get("status"),
			payment: state.get("payment"),
		};
	}
	componentWillMount() {
		const email = this.props.app_state.user.get("email");
		SettingsActions.getPaymentInformation(email);
	}
	UpdatePayment = updated_value => {
		const email = this.props.app_state.user.get("email");
		SettingsActions.updatePayment(email, updated_value);
	};
	render() {
		if (this.state.status === StoreState.READY){
			return (
				<PaymentView
					{...this.state}
					UpdatePayment={this.UpdatePayment}
				/>
			);
		}
		else return null;
	}
}

const PaymentContainer = Container.create(Payment);

class PaymentWrapper extends Component {
	render() {
		return (
			<Consumer>
				{app_state => <PaymentContainer app_state={app_state.state} />}
			</Consumer>
		);
	}
}

export default PaymentWrapper;
