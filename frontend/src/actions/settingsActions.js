import Dispatcher from '../lib/dispatchers';
import ActionTypes from '../constants/actionTypes';
import ApiClient from '../client.js';

const SettingsAction = {
	getAllUserInformation(email){
		setTimeout(()=>{
			Dispatcher.dispatch({
				type: ActionTypes.ALL_USER_INFORMATION_FETCH_START
			})
		},1);
		
		ApiClient.getAllUserInformation(email, (response,error) =>{
			if (error){
				Dispatcher.dispatch({
					type: ActionTypes.ALL_USER_INFORMATION_FETCH_ERROR
				})
			}
			else{
				Dispatcher.dispatch({
					type: ActionTypes.ALL_USER_INFORMATION_FETCH_SUCCESS,
					payload: response.data
				})
			}
		});
	},
	getSubscriptionsInformation(email){
		setTimeout(()=>{
			Dispatcher.dispatch({
				type: ActionTypes.SUBSCRIPTIONS_INFORMATION_FETCH_START
			})
		},1);
		
		ApiClient.getSubscriptionsInformation(email, (response,error) =>{
			if (error){
				Dispatcher.dispatch({
					type: ActionTypes.SUBSCRIPTIONS_INFORMATION_FETCH_ERROR
				})
			}
			else{
				Dispatcher.dispatch({
					type: ActionTypes.SUBSCRIPTIONS_INFORMATION_FETCH_SUCCESS,
					payload: response.data
				})
			}
		});
	},

	getDeliveryInformation(email){
		setTimeout(()=>{
			Dispatcher.dispatch({
				type: ActionTypes.DELIVERY_INFORMATION_FETCH_START
			})
		},1);
		
		ApiClient.getDeliveryInformation(email, (response,error) =>{
			if (error){
				Dispatcher.dispatch({
					type: ActionTypes.DELIVERY_INFORMATION_FETCH_ERROR
				})
			}
			else{
				Dispatcher.dispatch({
					type: ActionTypes.DELIVERY_INFORMATION_FETCH_SUCCESS,
					payload: response.data
				})
			}
		});
	},

	getAccountInformation(email){
		setTimeout(()=>{
			Dispatcher.dispatch({
				type: ActionTypes.ACCOUNT_INFORMATION_FETCH_START
			})
		},1);
		
		ApiClient.getAccountInformation(email, (response,error) =>{
			if (error){
				Dispatcher.dispatch({
					type: ActionTypes.ACCOUNT_INFORMATION_FETCH_ERROR
				})
			}
			else{
				Dispatcher.dispatch({
					type: ActionTypes.ACCOUNT_INFORMATION_FETCH_SUCCESS,
					payload: response.data
				})
			}
		});
	},

	getPaymentInformation(email){
		setTimeout(()=>{
			Dispatcher.dispatch({
				type: ActionTypes.PAYMENT_INFORMATION_FETCH_START
			})
		},1);
		
		ApiClient.getPaymentInformation(email, (response,error) =>{
			if (error){
				Dispatcher.dispatch({
					type: ActionTypes.PAYMENT_INFORMATION_FETCH_ERROR
				})
			}
			else{
				Dispatcher.dispatch({
					type: ActionTypes.PAYMENT_INFORMATION_FETCH_SUCCESS,
					payload: response.data
				})
			}
		});
	},

	
	updateSubscription(email, updated_values) {
	  setTimeout(() => {
			Dispatcher.dispatch({
				type: ActionTypes.SUBSCRIPTION_UPDATE_START
			});
			}, 1);
  
	  ApiClient.updateSubscription(email, updated_values, (response, error) => {
		if (error) {
		  Dispatcher.dispatch({
			type: ActionTypes.SUBSCRIPTION_UPDATE_ERROR
		  });
		} else {
		  if (response.status === 200 && response.data.error_code) {
				Dispatcher.dispatch({
					type: ActionTypes.SUBSCRIPTION_UPDATE_ERROR,
					payload: response.data
				});
		  } else {
				Dispatcher.dispatch({
					type: ActionTypes.SUBSCRIPTION_UPDATE_SUCCESS,
					payload: response.data
				})
		  }
		}
	  });
	},
	updateAccount(email, updated_values) {
	  setTimeout(() => {
			Dispatcher.dispatch({
				type: ActionTypes.ACCOUNT_UPDATE_START
			});
	  }, 1);
  
	  ApiClient.updateAccount(email, updated_values, (response, error) => {
			if (error) {
				Dispatcher.dispatch({
				type: ActionTypes.ACCOUNT_UPDATE_ERROR
				});
			} else {
				if (response.status === 200 && response.data.error_code) {
					Dispatcher.dispatch({
						type: ActionTypes.ACCOUNT_UPDATE_ERROR,
						payload: response.data
					});
				} else {
					console.log(response.data)
					Dispatcher.dispatch({
						type: ActionTypes.ACCOUNT_UPDATE_SUCCESS,
						payload: response.data
					})
				}
			}
	  });
	},
	updateDelivery(email, updated_values) {
	  setTimeout(() => {
		Dispatcher.dispatch({
		  type: ActionTypes.DELIVERY_UPDATE_START
		});
	  }, 1);
  
	  ApiClient.updateDelivery(email, updated_values, (response, error) => {
		if (error) {
		  Dispatcher.dispatch({
			type: ActionTypes.DELIVERY_UPDATE_ERROR
		  });
		} else {
		  if (response.status === 200 && response.data.error_code) {
				Dispatcher.dispatch({
					type: ActionTypes.DELIVERY_UPDATE_ERROR,
					payload: response.data
				});
		  } else {
				Dispatcher.dispatch({
					type: ActionTypes.DELIVERY_UPDATE_SUCCESS,
					payload: response.data
				});
		  }
		}
	  });
	},
	updatePayment(email, updated_values) {
	  setTimeout(() => {
		Dispatcher.dispatch({
		  type: ActionTypes.PAYMENT_UPDATE_START
		});
	  }, 1);
  
	  ApiClient.updatePayment(email, updated_values, (response, error) => {
		if (error) {
		  Dispatcher.dispatch({
			type: ActionTypes.PAYMENT_UPDATE_ERROR
		  });
		} else {
		  if (response.status === 200 && response.data.error_code) {
				Dispatcher.dispatch({
					type: ActionTypes.PAYMENT_UPDATE_ERROR,
					payload: response.data
				});
		  } else {
				Dispatcher.dispatch({
					type: ActionTypes.PAYMENT_UPDATE_SUCCESS,
					payload: response.data
				});
		  }
		}
	  });
	}
}

export default SettingsAction;