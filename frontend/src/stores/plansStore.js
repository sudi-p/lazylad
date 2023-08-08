import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
  status: StoreState.LOADING,
  plans: []
});

class PlansStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return initialState;
  }

  reduce(state, action) {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.PLANS_LIST_FETCH_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.PLANS_LIST_FETCH_ERROR: {
        return state.merge({
          status: StoreState.ERROR,
          error: payload
        });
      }

      case ActionTypes.PLANS_LIST_FETCH_SUCCESS: {
        const plans = Immutable.fromJS(payload.data);
        return state.merge({
          status: StoreState.READY,
          plans: plans
        });
      }

      case ActionTypes.THREE_DAYS_PLANS_LIST_FETCH_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.THREE_DAYS_PLANS_LIST_FETCH_ERROR: {
        return state.merge({
          status: StoreState.ERROR,
          error: payload
        });
      }

      case ActionTypes.THREE_DAYS_PLANS_LIST_FETCH_SUCCESS: {
        const plans = Immutable.fromJS(payload.data);
        return state.merge({
          status: StoreState.READY,
          plans: plans
        });
      }
      case ActionTypes.FIVE_DAYS_PLANS_LIST_FETCH_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.FIVE_DAYS_PLANS_LIST_FETCH_ERROR: {
        return state.merge({
          status: StoreState.ERROR,
          error: payload
        });
      }

      case ActionTypes.FIVE_DAYS_PLANS_LIST_FETCH_SUCCESS: {
        const plans = Immutable.fromJS(payload.data);
        return state.merge({
          status: StoreState.READY,
          plans: plans
        });
      }
      default:
        return state;
    }
  }
}

export default new PlansStore();
