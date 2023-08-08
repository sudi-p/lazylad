import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UpcomingContainer from "./customer/UpcomingContainer";
import CurrentContainer from "./customer/CurrentContainer";
import SettingsView from "./customer/settings/SettingsView";
import DeliveryHistoryContainer from "./customer/DeliveryHistoryContainer";
import Restaurants from "./customer/Restaurants";
import PageNotFound from "./error/PageNotFound";
import "./styles/Main.module.css";

class MainCustomer extends Component {
  render() {
    return (
      <main className="main">
        <Switch>
          <Redirect exact from="/account/" to="/account/current/" />
          <Redirect exact from="/" to="/account/current/" />
          <Route path="/account/current/" component={CurrentContainer} />
          <Route path="/account/upcoming/" component={UpcomingContainer} />
          <Route path="/account/restaurants/" component={Restaurants} />
          <Route
            path="/account/settings/"
            component={props => <SettingsView {...props} />}
          />
          <Route
            path="/account/deliveryHistory/"
            component={DeliveryHistoryContainer}
          />
          <Route component={PageNotFound} />
        </Switch>
      </main>
    );
  }
}

export default MainCustomer;
