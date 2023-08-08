import React from "react";
import { Container } from "flux/utils";
import { Switch, Route } from "react-router-dom";

import DishActions from "../actions/dishActions";
import DishStore from "../stores/dishStore";
import DishesView from "./DishesView";
import DishCreate from "./DishCreate";

class Dishes extends React.Component {
  static getStores() {
    return [DishStore];
  }

  static calculateState(prevState, props) {
    const state = DishStore.getState();
    return {
      dishes: state.get("dishes"),
      isLoading: state.get("isLoading")
    };
  }

  componentWillMount() {
    DishActions.fetchDishes();
  }
  AddDish(dish) {
    DishActions.addDish(dish);
  }
  DishesViewRoute = () => {
    return <DishesView {...this.state} />;
  };
  DishCreateRoute = () => {
    return <DishCreate AddDish={this.AddDish.bind(this)} />;
  };
  render() {
    return (
      <Switch>
        <Route exact path="/dishes/" render={this.DishesViewRoute} />
        <Route path="/dishes/add-dish/" render={this.DishCreateRoute} />
      </Switch>
    );
  }
}

export default Container.create(Dishes);
