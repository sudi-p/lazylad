import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';

import Dispatcher from '../lib/dispatchers.js';
import ActionTypes from '../constants/actionTypes.js';
import { StoreState } from '../constants/StoreState.js';

const initialState = Immutable.fromJS({
  status: StoreState.LOADING,
  signup_error: "",
  signup_status: ""
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
      case ActionTypes.ADD_CUSTOMER_START: {
        return state.set('status', StoreState.LOADING);
      }

      case ActionTypes.ADD_CUSTOMER_ERROR: {
        return state.merge({
          status: StoreState.ERROR,
          error: payload,
        });
      }

      case ActionTypes.EMAIL_ALREADY_USED: {
        const data = Immutable.fromJS(payload.data);
        return state.merge({
          status: StoreState.READY,
          signup_error: data,
        });
      }

      case ActionTypes.ADD_CUSTOMER_SUCCESS: {
        const data = Immutable.fromJS(payload.data);
        return state.merge({
          status: StoreState.READY,
          signup_status: data.get('status'),
        });
      }
      default:
        return state;
    }
  }
}

export default new DishStore();