import Dispatcher from "../lib/dispatchers";
import ActionTypes from "../constants/actionTypes";
import ApiClient from "../client.js";

const AppAction = {
  getAppState(customer_id) {
    Dispatcher.dispatch({
      type: ActionTypes.APP_STATE_FETCH_START
    });

    ApiClient.getAppState(customer_id, (response, error) => {
      if (error) {
        Dispatcher.dispatch({
          type: ActionTypes.APP_STATE_FETCH_ERROR,
          payload: response
        });
      } else {
        Dispatcher.dispatch({
          type: ActionTypes.APP_STATE_FETCH_SUCCESS,
          payload: response.data
        });
      }
    });
  }
};

export default AppAction;
