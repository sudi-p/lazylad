import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class SettingsHeader extends Component {
	render() {
		return (
			<div className="settings_header">
				<NavLink
					to="/account/settings/subscriptions"
					activeClassName="active-item"
				>
					<div className="menu-item">Plan Settings</div>
				</NavLink>
				<NavLink to="/account/settings/delivery" activeClassName="active-item">
					<div className="menu-item">Delivery Info</div>
				</NavLink>
				<NavLink to="/account/settings/account" activeClassName="active-item">
					<div className="menu-item">Account Info</div>
				</NavLink>
				<NavLink to="/account/settings/payments" activeClassName="active-item">
					<div className="menu-item">Payments</div>
				</NavLink>
				<NavLink to="/account/settings/social" activeClassName="active-item">
					<div className="menu-item">Social Settings</div>
				</NavLink>
				<NavLink to="/account/settings/support" activeClassName="active-item">
					<div className="menu-item">Support</div>
				</NavLink>
			</div>
		);
	}
}

export default SettingsHeader;
