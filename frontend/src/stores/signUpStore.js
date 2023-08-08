import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
  status: StoreState.EMPTY,
  loading: true,
  signup_error: false
});

class DishStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return initialState;
  }

  reduce(state, action) {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.CREATE_CUSTOMER_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.ADD_CUSTOMER_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.ADD_CUSTOMER_ERROR: {
        return state.merge({
          status: StoreState.ERROR,
          error: payload
        });
      }

      case ActionTypes.EMAIL_ALREADY_USED: {
        return state.merge({
          status: StoreState.ERROR,
          signup_error: payload.error_code
        });
      }
      /* case ActionTypes.EMAIL_NOT_USED: {
        return state.merge({
          status: StoreState.READY,
        });
      }
      */
      case ActionTypes.ADD_CUSTOMER_SUCCESS: {
        return state.merge({
          status: StoreState.READY
        });
      }
      default:
        return state;
    }
  }
}

export default new DishStore();
