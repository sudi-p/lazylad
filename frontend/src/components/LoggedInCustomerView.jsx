import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import CustomerHeader from "./headers/CustomerHeader";
import MainCustomer from "./MainCustomer";
import LandingFooter from "./footers/LandingFooter";
import ServerCrash from "./error/ServerCrash";
import { Layout } from "antd";
const { Content } = Layout;

const CustomerView = () => (
  <Layout>
    <CustomerHeader />
    <Layout>
      <Content>
        <MainCustomer />
      </Content>
    </Layout>
    <LandingFooter />
  </Layout>
);

class LoggedInCustomerView extends Component {
  render() {
    return (
      <Switch>
        <Route path="/oops" render={ServerCrash} />
        <Route component={CustomerView} />
      </Switch>
    );
  }
}

export default LoggedInCustomerView;
