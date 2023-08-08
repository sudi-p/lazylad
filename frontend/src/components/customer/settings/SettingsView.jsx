import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SettingsHeader from "./SettingsHeader";
import SettingsMobileContainer from "./SettingsMobileContainer";
import SubscriptionsContainer from "./SubscriptionsContainer";
import DeliveryContainer from "./DeliveryContainer";
import AccountContainer from "./AccountContainer";
import PaymentContainer from "./PaymentContainer";
import Social from "./Social";
import Support from "./Support";
import { Row, Col } from "antd";
import "../../styles/Settings.module.css";

class SettingsView extends Component {
	render() {
    if (window.innerWidth >= '768'){
      return (
          <div className="settings settings--large">
            <h1 className="title">Account Settings</h1>
            <Row>
              <Col span={6}>
                <SettingsHeader />
              </Col>
              <Col span={18} className="content">
                <Switch>
                  <Redirect
                    exact
                    from="/account/settings"
                    to="/account/settings/subscriptions"
                  />
                  <Route
                    exact
                    path="/account/settings/subscriptions"
                    component={SubscriptionsContainer}
                  />
                  <Route
                    exact
                    path="/account/settings/delivery"
                    component={DeliveryContainer}
                  />
                  <Route
                    exact
                    path="/account/settings/account"
                    component={AccountContainer}
                  />
                  <Route
                    exact
                    path="/account/settings/payments"
                    component={PaymentContainer}
                  />
                  <Route
                    exact
                    path="/account/settings/social"
                    component={Social}
                  />
                  <Route
                    exact
                    path="/account/settings/support"
                    component={Support}
                  />
                </Switch>
              </Col>
            </Row>
          </div>
      );
    }
    else{
      return (
      <SettingsMobileContainer />
      );
    }
	}
}

export default SettingsView;
