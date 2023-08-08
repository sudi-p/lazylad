import React from "react";
import { Container } from "flux/utils";

import PlansActions from "../../actions/plansActions";
import PlansStore from "../../stores/plansStore";
import UpcomingMenuView from "./UpcomingMenuView";

class UpcomingContainer extends React.Component {
  static getStores() {
    return [PlansStore];
  }

  static calculateState(prevState, props) {
    const state = PlansStore.getState();
    return {
      plans: state.get("plans"),
      isLoading: state.get("isLoading")
    };
  }

  componentWillMount() {
    PlansActions.fetchMenu();
  }
  getFiveDaysPlans() {
    PlansActions.fetchFiveDaysPlans();
  }
  getThreeDaysPlans() {
    PlansActions.fetchThreeDaysPlans();
  }
  render() {
    return (
      <div className="upcoming">
        <UpcomingMenuView
          {...this.state}
          getFiveDaysPlans={this.getFiveDaysPlans}
          getThreeDaysPlans={this.getThreeDaysPlans}
          getFilteredDishes={this.getFilteredDishes}
        />
      </div>
    );
  }
}

export default Container.create(UpcomingContainer);
