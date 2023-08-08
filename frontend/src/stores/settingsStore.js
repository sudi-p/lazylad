import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
	status: StoreState.EMPTY,
	account: {},
	delivery: {},
	subscription: {},
	payment: {}
});

class SettingsStore extends ReduceStore {
	constructor() {
		super(Dispatcher);
	}

	getInitialState() {
		return initialState;
	}

	reduce(state, action) {
		const { type, payload } = action;

		switch (type) {
			case ActionTypes.ALL_USER_INFORMATION_FETCH_START: {
				return state.set("status", StoreState.LOADING);
			}

			case ActionTypes.ALL_USER_INFORMATION_FETCH_ERROR: {
				return state.merge({
					status: StoreState.ERROR
				});
			}
			case ActionTypes.ALL_USER_INFORMATION_FETCH_SUCCESS: {
				return state.merge({
					status: StoreState.READY,
					account: payload.account,
					delivery: payload.delivery,
					subscription: payload.subscription,
					payment: payload.payment
				});
			}
			case ActionTypes.ACCOUNT_UPDATE_SUCCESS: {
				return state.merge({
					status: StoreState.READY,
					account: payload.account,
				});
			}
			case ActionTypes.SUBSCRIPTION_UPDATE_SUCCESS: {
				return state.merge({
					status: StoreState.READY,
					subscription: payload.subscription,
				});
			}
			case ActionTypes.DELIVERY_UPDATE_SUCCESS: {
				return state.merge({
					status: StoreState.READY,
					delivery: payload.delivery,
				});
			}
			case ActionTypes.PAYMENT_UPDATE_SUCCESS: {
				return state.merge({
					status: StoreState.READY,
					payment: payload.payment,
				});
			}
			default:
				return state;
		}
	}
}

export default new SettingsStore();
