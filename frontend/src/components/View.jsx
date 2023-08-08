import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import SignUpContainer from "./signup/SignUpContainer";
import LandingFooter from "./footers/LandingFooter";
import FloatingHeader from "./headers/FloatingHeader";
import Main from "./Main";
import LoggedInRestaurantView from "./LoggedInRestaurantView";
import { Layout } from "antd";
import ServerCrash from "./error/ServerCrash";
import ServiceNotAvailable from "./error/ServiceNotAvailable";

const OtherView = () => (
  <Layout style={{ background: "white" }}>
    <FloatingHeader />
    <Main />
    <LandingFooter />
  </Layout>
);

const SignUpView = props => {
  return (
    <Layout style={{ background: "white" }}>
      <SignUpContainer {...props} />
      <LandingFooter />
    </Layout>
  );
};


class View extends Component {
  render() {
    return (
      <Switch>
        <Route path="/signup/" component={props => <SignUpView {...props} />} />
        <Route path="/restaurant/" component={props => <LoggedInRestaurantView/>} />
        <Route path="/server-crash" component={ServerCrash} />
        <Route path="/service-not-available" component={ServiceNotAvailable} />
        <Route component={OtherView} />
      </Switch>
    );
  }
}

export default View;
