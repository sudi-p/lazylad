import Dispatcher from '../lib/dispatchers.js';
import ActionTypes from '../constants/actionTypes.js';
import ApiClient from '../client.js';

const IndividualDishActions = {

  fetchDish(cookID) {
    Dispatcher.dispatch({
      type: ActionTypes.DISH_FETCH_START,
    });

    ApiClient.getDish(cookID, (response, error) => {

      if(error) {
        Dispatcher.dispatch({
          type: ActionTypes.DISH_FETCH_ERROR,
          payload: response,
        });
        return;
      }
      Dispatcher.dispatch({
        type: ActionTypes.DISH_FETCH_SUCCESS,
        payload: response,
      });
    });
  },
  editDish(newDish) {
    Dispatcher.dispatch({
      type: ActionTypes.EDIT_DISH_START,
    });

    ApiClient.editDish(newDish, (response, error) => {
      if(error) {
        Dispatcher.dispatch({
          type: ActionTypes.EDIT_DISH_ERROR,
          payload: response,
        });
        return;
      }
      Dispatcher.dispatch({
        type: ActionTypes.EDIT_DISH_SUCCESS,
        payload: response,
      });
      window.location.href = "/dish/"+response.data.id
    }); 
  },
  addDishInfo(dish_id, dish_info){
    Dispatcher.dispatch({
      type: ActionTypes.ADD_DISH_INFO_START,
    });

    ApiClient.addDishInfo(dish_id, dish_info, (response, error) => {
      if(error) {
        Dispatcher.dispatch({
          type: ActionTypes.ADD_DISH_INFO_ERROR,
          payload: response,
        });
        return;
      }
      Dispatcher.dispatch({
        type: ActionTypes.ADD_DISH_INFO_SUCCESS,
        payload: response,
      });
      window.location.href = "/dish/"+dish_id+"/"
    }); 
  }
};

export default IndividualDishActions;