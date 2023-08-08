import React from "react";
import { Container } from "flux/utils";
import { Switch, Route } from "react-router-dom";

import PlansActions from "../actions/plansActions";
import PlansStore from "../stores/plansStore";
import MenuView from "./MenuView";

class Plans extends React.Component {
  static getStores() {
    return [PlansStore];
  }

  static calculateState(prevState, props) {
    const state = PlansStore.getState();
    return {
      menus: state.get("plans"),
      isLoading: state.get("isLoading")
    };
  }

  componentWillMount() {
    PlansActions.fetchMenu();
  }
  PlansViewRoute = () => {
    return <MenuView {...this.state} />;
  };
  render() {
    return (
      <Switch>
        <Route exact path="/menu/" render={this.PlansViewRoute} />
      </Switch>
    );
  }
}

export default Container.create(Plans);
