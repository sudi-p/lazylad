import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
  status: StoreState.EMPTY,
  delivered_weeklyorders_list: []
});

class DeliveryHistoryStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return initialState;
  }

  reduce(state, action) {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.DELIVERY_HISTORY_FETCH_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.DELIVERY_HISTORY_FETCH_ERROR: {
        return state.merge({
          status: StoreState.ERROR,
          error: payload
        });
      }
      case ActionTypes.DELIVERY_HISTORY_FETCH_SUCCESS: {
        return state.merge({
          status: StoreState.READY,
          delivered_weeklyorders_list: payload
        });
      }
      default:
        return state;
    }
  }
}

export default new DeliveryHistoryStore();
