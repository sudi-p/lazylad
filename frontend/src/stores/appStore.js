import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
  status: StoreState.EMPTY,
  signup_complete: false,
  plan: {},
  user: ""
});

class AppStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return initialState;
  }

  reduce(state, action) {
    const { type, payload } = action;

    switch (type) {
      case ActionTypes.APP_STATE_FETCH_START: {
        return state.set("status", StoreState.LOADING);
      }

      case ActionTypes.APP_STATE_FETCH_ERROR: {
        return state.merge({
          status: StoreState.ERROR,
          error: payload
        });
      }

      case ActionTypes.APP_STATE_FETCH_SUCCESS: {
        const user = Immutable.fromJS(payload.user);
        const plan = Immutable.fromJS(payload.plan);
        return state.merge({
          status: StoreState.READY,
          user: user,
          plan: plan,
          signup_complete: user.get("signup_complete")
        });
      }

      case ActionTypes.ACCOUNT_UPDATE_SUCCESS: {
        const user = Immutable.fromJS(payload.account);
        return state.merge({
          status: StoreState.READY,
          user: user,
          signup_complete: user.get("signup_complete")
        });
      }

      case ActionTypes.SUBSCRIPTION_UPDATE_SUCCESS: {
        const plan = Immutable.fromJS(payload.subscription);
        return state.merge({
          status: StoreState.READY,
          plan: plan
        });
      }

      case ActionTypes.PLAN_SELECT_SUCCESS: {
        const plan = Immutable.fromJS(payload);
        return state.merge({
          status: StoreState.READY,
          plan: plan
        });
      }
      case ActionTypes.CUSTOMER_CREATED: {
        const customer = Immutable.fromJS(payload);
        return state.merge({
          status: StoreState.READY,
          user: customer,
          signup_complete: customer.get("signup_complete")
        });
      }
      case ActionTypes.ADD_CUSTOMER_SUCCESS: {
        const customer = Immutable.fromJS(payload);
        return state.merge({
          status: StoreState.READY,
          signup_complete: customer.get("user").get("signup_complete"),
          user: customer.get("user"),
          plan: customer.get("plan")
        });
      }

      case ActionTypes.LOGIN_CUSTOMER_SUCCESS: {
        const customer = Immutable.fromJS(payload);
        return state.merge({
          status: StoreState.READY,
          signup_complete: customer.get("user").get("signup_complete"),
          user: customer.get("user"),
          plan: customer.get("plan")
        });
      }

      case ActionTypes.CUSTOMER_LOGOUT: {
        return state.merge({
          signup_complete: false,
          user: "",
          status: StoreState.EMPTY,
          plan: {}
        });
      }

      default:
        return state;
    }
  }
}

export default new AppStore();
