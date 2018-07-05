import Dispatcher from '../lib/dispatchers.js';
import ActionTypes from '../constants/actionTypes.js';
import ApiClient from '../client.js';

const PlansActions = {
  fetchPlans(params) {
    Dispatcher.dispatch({
      type: ActionTypes.PLANS_LIST_FETCH_START,
    });

    ApiClient.getPlans(params, (response, error) => {
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
  },
  fetchFiveDaysPlans(params) {
    Dispatcher.dispatch({
      type: ActionTypes.FIVE_DAYS_PLANS_LIST_FETCH_START,
    });

    ApiClient.getFiveDaysPlans(params, (response, error) => {
      if(error) {
        Dispatcher.dispatch({
          type: ActionTypes.FIVE_DAYS_PLANS_LIST_FETCH_ERROR,
          payload: response,
        });
        return;
      }
      Dispatcher.dispatch({
        type: ActionTypes.FIVE_DAYS_PLANS_LIST_FETCH_SUCCESS,
        payload: response,
      });
    });
  },
  fetchThreeDaysPlans(params) {
    Dispatcher.dispatch({
      type: ActionTypes.THREE_DAYS_PLANS_LIST_FETCH_START,
    });

    ApiClient.getThreeDaysPlans(params, (response, error) => {
      if(error) {
        Dispatcher.dispatch({
          type: ActionTypes.THREE_DAYS_PLANS_LIST_FETCH_ERROR,
          payload: response,
        });
        return;
      }
      Dispatcher.dispatch({
        type: ActionTypes.THREE_DAYS_PLANS_LIST_FETCH_SUCCESS,
        payload: response,
      });
    });
  }

};

export default PlansActions;