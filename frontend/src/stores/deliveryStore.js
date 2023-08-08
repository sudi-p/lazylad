import { ReduceStore } from "flux/utils";
import Immutable from "immutable";

import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import { StoreState } from "../constants/StoreState.js";

const initialState = Immutable.fromJS({
	status: StoreState.EMPTY,
	delivery: {},
});

class DeliveryStore extends ReduceStore {
	constructor() {
		super(Dispatcher);
	}

	getInitialState() {
		return initialState;
	}

	reduce(state, action) {
		const { type, payload } = action;

		switch (type) {
			case ActionTypes.DELIVERY_INFORMATION_FETCH_START: {
				return state.set("status", StoreState.LOADING);
			}

			case ActionTypes.DELIVERY_INFORMATION_FETCH_ERROR: {
				return state.merge({
					status: StoreState.ERROR
				});
			}
			case ActionTypes.DELIVERY_INFORMATION_FETCH_SUCCESS:
			case ActionTypes.DELIVERY_UPDATE_SUCCESS: {
				return state.merge({
					status: StoreState.READY,
					delivery: payload.delivery,
				});
			}

			default:
				return state;
		}
	}
}

export default new DeliveryStore();
