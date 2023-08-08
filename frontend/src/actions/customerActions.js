import Dispatcher from "../lib/dispatchers";
import ActionTypes from "../constants/actionTypes";
import ApiClient from "../client.js";

const CustomerAction = {
  getCurrentDishes(email, history) {
    setTimeout(function() {
      Dispatcher.dispatch({
        type: ActionTypes.CURRENT_MENU_FETCH_START
      });
    }, 1);

    ApiClient.getCurrentDishes(email, (response, error) => {
      if (error) {
        Dispatcher.dispatch({
          type: ActionTypes.CURRENT_MENU_FETCH_ERROR,
          payload: response
        });
      } else {
        if (response.status === 204) {
          Dispatcher.dispatch({
            type: ActionTypes.CURRENT_MENU_NOT_PRESENT,
            payload: response
          });
        } else {
          Dispatcher.dispatch({
            type: ActionTypes.CURRENT_MENU_FETCH_SUCCESS,
            payload: response
          });
        }
      }
    });
  },
  getUpcomingDishes(email, history) {
    setTimeout(function() {
      Dispatcher.dispatch({
        type: ActionTypes.UPCOMING_MENU_FETCH_START
      });
    }, 1);
    ApiClient.getUpcomingDishes(email, (response, error) => {
      if (error) {
        //if (error.response.status === 500){
        //  history.push('/oops')
        //}
        Dispatcher.dispatch({
          type: ActionTypes.UPCOMING_MENU_FETCH_ERROR,
          payload: response
        });
      } else {
        if (response.status === 204) {
          Dispatcher.dispatch({
            type: ActionTypes.UPCOMING_MENU_NOT_PRESENT
          });
        } else {
          Dispatcher.dispatch({
            type: ActionTypes.UPCOMING_MENU_FETCH_SUCCESS,
            payload: response
          });
        }
      }
    });
  },
  handleSkip(email, weeklyorder_id) {
    ApiClient.handleSkip(email, weeklyorder_id, (response, error) => {
      if (error) {
        Dispatcher.dispatch({
          type: ActionTypes.UPCOMING_MENU_FETCH_ERROR,
          payload: response
        });
      } else {
        Dispatcher.dispatch({
          type: ActionTypes.UPCOMING_MENU_FETCH_SUCCESS,
          payload: response
        });
      }
    });
  },
  handleUnskip(email, weeklyorder_id) {
    ApiClient.handleUnskip(email, weeklyorder_id, (response, error) => {
      if (error) {
        Dispatcher.dispatch({
          type: ActionTypes.UPCOMING_MENU_FETCH_ERROR,
          payload: response
        });
      } else {
        Dispatcher.dispatch({
          type: ActionTypes.UPCOMING_MENU_FETCH_SUCCESS,
          payload: response
        });
      }
    });
  },
  saveDishChange(email, weeklyorder_id, dish_list) {
    ApiClient.saveDishesChange(
      email,
      weeklyorder_id,
      dish_list,
      (response, error) => {
        if (error) {
          Dispatcher.dispatch({
            type: ActionTypes.SAVE_DISHES_CHANGE_ERROR,
            payload: response
          });
        } else {
          Dispatcher.dispatch({
            type: ActionTypes.SAVE_DISHES_CHANGE_SUCCESS,
            payload: response
          });
        }
      }
    );
  },
  changeDish(weeklyorder_id) {
    setTimeout(
      () =>
        Dispatcher.dispatch({
          type: ActionTypes.CHANGE_DISH,
          payload: weeklyorder_id
        }),
      1
    );
  },
  changeDishList(dish_list) {
    setTimeout(
      () =>
        Dispatcher.dispatch({
          type: ActionTypes.CHANGE_DISH_LIST,
          payload: dish_list
        }),
      1
    );
  },
  cancelChangeDish() {
    setTimeout(
      () =>
        Dispatcher.dispatch({
          type: ActionTypes.CANCEL_CHANGE_DISH
        }),
      1
    );
  },
  resetState() {
    setTimeout(
      () =>
        Dispatcher.dispatch({
          type: ActionTypes.RESET_UPCOMING_STATE
        }),
      1
    );
  },
  logout(history) {
    document.cookie =
      "customer=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Dispatcher.dispatch({
      type: ActionTypes.CUSTOMER_LOGOUT
    });
    history.replace("/");
  },

  getDeliveryHistory(email) {
    setTimeout(() => {
      Dispatcher.dispatch({
        type: ActionTypes.DELIVERY_HISTORY_FETCH_START
      });
    }, 1);

    ApiClient.getDeliveryHistory(email, (response, error) => {
      if (error) {
        Dispatcher.dispatch({
          type: ActionTypes.DELIVERY_HISTORY_FETCH_ERROR
        });
      } else {
        if (response.status === 200 && response.data.error_code) {
          Dispatcher.dispatch({
            type: ActionTypes.DELIVERY_HISTORY_FETCH_ERROR,
            payload: response.data
          });
        } else {
          Dispatcher.dispatch({
            type: ActionTypes.DELIVERY_HISTORY_FETCH_SUCCESS,
            payload: response.data
          });
        }
      }
    });
  }
};

export default CustomerAction;
