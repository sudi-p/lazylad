import Dispatcher from "../lib/dispatchers.js";
import ActionTypes from "../constants/actionTypes.js";
import ApiClient from "../client.js";

const DishActions = {

  fetchDishes(cookID) {
    Dispatcher.dispatch({
      type: ActionTypes.DISH_LIST_FETCH_START,
    });

    ApiClient.getDishes(cookID, (response, error) => {
      if(error) {
        Dispatcher.dispatch({
          type: ActionTypes.DISH_LIST_FETCH_ERROR,
          payload: response,
        });
        return;
      }
      Dispatcher.dispatch({
        type: ActionTypes.DISH_LIST_FETCH_SUCCESS,
        payload: response,
      });
    });
  },
  addDish(newDish) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_DISH_START,
    });

    ApiClient.addDish(newDish, (response, error) => {
      if(error) {
        Dispatcher.dispatch({
          type: ActionTypes.ADD_DISH_ERROR,
          payload: response,
        });
        return;
      }
      Dispatcher.dispatch({
        type: ActionTypes.ADD_DISH_SUCCESS,
        payload: response,
      });
      
      window.location.href = "/dish/"+response.data.id+"/dish-info/";
    });
  },
  

};

export default DishActions;