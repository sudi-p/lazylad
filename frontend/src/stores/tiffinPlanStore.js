import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
  status: StoreState.LOADING,
  plan: {}
});

class TiffinPlanStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return initialState;
  }
  reduce(state, action) {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.TIFFIN_PLAN_FETCH_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.TIFFIN_PLAN_FETCH_ERROR: {
        return state.merge({
          status: StoreState.ERROR,
          error: payload
        });
      }

      case ActionTypes.TIFFIN_PLAN_FETCH_SUCCESS: {
        const plan = Immutable.fromJS(payload.data);
        return state.merge({
          status: StoreState.READY,
          plan: plan
        });
      }
      default:
        return state;
    }
  }
}

export default new TiffinPlanStore();
