import Dispatcher from '../lib/dispatchers.js';
import ActionTypes from '../constants/actionTypes';
import ApiClient from '../client.js';

const tiffinPlanActions = {

  fetchPlan(plan_id) {
    Dispatcher.dispatch({
      type: ActionTypes.TIFFIN_PLAN_FETCH_START,
    });

    ApiClient.getPlan(plan_id, (response, error) => {
      if(error) {
        Dispatcher.dispatch({
          type: ActionTypes.TIFFIN_PLAN_FETCH_ERROR,
          payload: response,
        });
        return;
      }
      Dispatcher.dispatch({
        type: ActionTypes.TIFFIN_PLAN_FETCH_SUCCESS,
        payload: response,
      });
    });
  }

};

export default tiffinPlanActions;
