import React, { Component } from "react";
import { Container } from "flux/utils";
import AccountStore from "../../../stores/accountStore";
import SettingsActions from "../../../actions/settingsActions";
import AccountView from "./Account";
import { Consumer } from "../../App";
import { StoreState } from "../../../constants/StoreState";

class Account extends Component {
	static getStores() {
		return [AccountStore];
	}
	static calculateState(prevState, props) {
		const state = AccountStore.getState();
		return {
			status: state.get("status"),
			account: state.get("account"),
		};
	}
	componentWillMount() {
		const email = this.props.app_state.user.get("email");
		SettingsActions.getAccountInformation(email);
	}
	UpdateAccount = updated_value => {
		const email = this.props.app_state.user.get("email");
		SettingsActions.updateAccount(email, updated_value);
	};
	render() {
		if (this.state.status === StoreState.READY){
			return (
				<AccountView
					{...this.state}
					UpdateAccount={this.UpdateAccount}
				/>
			);
		}
		else return null;
		
	}
}

const AccountContainer = Container.create(Account);

class AccountWrapper extends Component {
	render() {
		return (
			<Consumer>
				{app_state => <AccountContainer app_state={app_state.state} />}
			</Consumer>
		);
	}
}

export default AccountWrapper;
