import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
	status: StoreState.EMPTY,
	subscription: {},
});

class SubscriptionStore extends ReduceStore {
	constructor() {
		super(Dispatcher);
	}

	getInitialState() {
		return initialState;
	}

	reduce(state, action) {
		const { type, payload } = action;

		switch (type) {
			case ActionTypes.SUBSCRIPTIONS_INFORMATION_FETCH_START: {
				return state.set("status", StoreState.LOADING);
			}

			case ActionTypes.SUBSCRIPTIONS_INFORMATION_FETCH_ERROR: {
				return state.merge({
					status: StoreState.ERROR
				});
			}
			case ActionTypes.SUBSCRIPTIONS_INFORMATION_FETCH_SUCCESS:
			case ActionTypes.SUBSCRIPTION_UPDATE_SUCCESS: {
				return state.merge({
					status: StoreState.READY,
					subscription: payload.subscription,
				});
			}

			default:
				return state;
		}
	}
}

export default new SubscriptionStore();
