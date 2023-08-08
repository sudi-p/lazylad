import React, { Component } from "react";
import Subscriptions from "./Subscriptions";
import Delivery from "./Delivery";
import Account from "./Account";
import Payment from "./Payment";
import Social from "./Social";
import Support from "./Support";
import { Divider } from "antd";
import "../../styles/Settings.module.css";
import { StoreState } from "../../../constants/StoreState";

class SettingsMobileView extends Component {
	render() {
    console.log(this.props)
    if (this.props.status === StoreState.READY) {
      return (
        <React.Fragment>
          <div className="settings settings--small">
            <h1 className="title">Account Settings</h1>
            <div className="content">
              <Subscriptions
                UpdateSubscription={this.props.UpdateSubscription}
                subscription={this.props.subscription}
              />
              <Divider />
              <Delivery
                delivery={this.props.delivery}
                UpdateDelivery={this.props.UpdateDelivery}
              />
              <Divider />
              <Account
                account={this.props.account}
                UpdateAccount={this.props.UpdateAccount}
              />
              <Divider />
              <Payment
                payment={this.props.payment}
                UpdatePayment={this.props.UpdatePayment}
              />
              <Divider />
              <Social />
              <Divider />
              <Support />
            </div>
          </div>
        </React.Fragment>
      );
    } else {
    	return null
    }
	}
}

export default SettingsMobileView;
