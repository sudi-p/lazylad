import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
  status: StoreState.LOADING,
  login_error: ""
});

class LogInStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return initialState;
  }

  reduce(state, action) {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.LOGIN_CUSTOMER_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.LOGIN_CUSTOMER_ERROR: {
        return state.merge({
          status: StoreState.ERROR,
          error: payload
        });
      }

      case ActionTypes.LOGIN_CUSTOMER_NOTMATCH: {
        return state.merge({
          status: StoreState.READY,
          login_error: "error"
        });
      }

      case ActionTypes.LOGIN_CUSTOMER_SUCCESS: {
        return state.merge({
          status: StoreState.READY
        });
      }
      default:
        return state;
    }
  }
}

export default new LogInStore();
