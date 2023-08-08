import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import ApiClient from "../client.js";

const PlansActions = {
  fetchMenu() {
    Dispatcher.dispatch({
      type: ActionTypes.PLANS_LIST_FETCH_START,
    });

    ApiClient.fetchMenu((response, error) => {
      if(error) {
        Dispatcher.dispatch({
          type: ActionTypes.PLANS_LIST_FETCH_ERROR,
          payload: response,
        });
        return;
      }
      Dispatcher.dispatch({
        type: ActionTypes.PLANS_LIST_FETCH_SUCCESS,
        payload: response,
      });
    });
  }
};

export default PlansActions;