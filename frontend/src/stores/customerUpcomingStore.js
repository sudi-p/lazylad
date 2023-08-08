import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
  status: StoreState.LOADING,
  menus: [],
  dish_change_week_id: "",
  new_dish_list: []
});

class CustomerUpcomingStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return initialState;
  }

  reduce(state, action) {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.UPCOMING_MENU_FETCH_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.UPCOMING_MENU_FETCH_ERROR: {
        return state.merge({
          status: StoreState.ERROR
        });
      }

      case ActionTypes.UPCOMING_MENU_NOT_PRESENT: {
        return state.merge({
          status: StoreState.EMPTY
        });
      }

      case ActionTypes.UPCOMING_MENU_FETCH_SUCCESS: {
        const menus = Immutable.fromJS(payload.data);
        return state.merge({
          status: StoreState.READY,
          menus: menus
        });
      }

      case ActionTypes.CHANGE_DISH: {
        return state.merge({
          dish_change_week_id: payload
        });
      }

      case ActionTypes.CHANGE_DISH_LIST: {
        return state.merge({
          new_dish_list: payload
        });
      }

      case ActionTypes.CANCEL_CHANGE_DISH: {
        return state.merge({
          dish_change_week_id: "",
          new_dish_list: []
        });
      }

      case ActionTypes.SAVE_DISHES_CHANGE_SUCCESS: {
        const menus = Immutable.fromJS(payload.data);
        return state.merge({
          dish_change_week_id: "",
          menus: menus,
          new_dish_list: []
        });
      }

      case ActionTypes.RESET_UPCOMING_STATE: {
        return state.merge({
          dish_change_week_id: "",
          new_dish_list: []
        });
      }

      default:
        return state;
    }
  }
}

export default new CustomerUpcomingStore();
