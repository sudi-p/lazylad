import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
  status: StoreState.LOADING,
  menu: {}
});

class CustomerCurrentStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return initialState;
  }

  reduce(state, action) {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.CURRENT_MENU_FETCH_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.CURRENT_MENU_FETCH_ERROR: {
        return state.merge({
          status: StoreState.ERROR
        });
      }

      case ActionTypes.CURRENT_MENU_FETCH_SUCCESS: {
        const menu = Immutable.fromJS(payload.data);
        return state.merge({
          status: StoreState.READY,
          menu: menu
        });
      }
      case ActionTypes.CURRENT_MENU_NOT_PRESENT: {
        return state.merge({
          status: StoreState.EMPTY
        });
      }
      default:
        return state;
    }
  }
}

export default new CustomerCurrentStore();
