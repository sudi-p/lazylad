import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
	status: StoreState.EMPTY,
	payment: {},
});

class PaymentStore extends ReduceStore {
	constructor() {
		super(Dispatcher);
	}

	getInitialState() {
		return initialState;
	}

	reduce(state, action) {
		const { type, payload } = action;

		switch (type) {
			case ActionTypes.PAYMENT_INFORMATION_FETCH_START: {
				return state.set("status", StoreState.LOADING);
			}

			case ActionTypes.PAYMENT_INFORMATION_FETCH_ERROR: {
				return state.merge({
					status: StoreState.ERROR
				});
			}
			case ActionTypes.PAYMENT_INFORMATION_FETCH_SUCCESS:
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

export default new PaymentStore();
