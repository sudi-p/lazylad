import Dispatcher from "../lib/dispatchers";
import ActionTypes from "../constants/actionTypes";
import ApiClient from "../client.js";

const SignUpAction = {
  createCustomer(customer_data, history) {
    Dispatcher.dispatch({
      type: ActionTypes.CREATE_CUSTOMER_START,
      payload: customer_data
    });

    ApiClient.createCustomer(customer_data,(response, error) => {
      if (error){
        if(error.response.status === 422){
          Dispatcher.dispatch({
            type: ActionTypes.EMAIL_ALREADY_USED,
            payload: error.response.data
          });
        }
      }
      else{
        if(response.status === 200){
          if (response.data.error_code === "zipcode_not_served"){
            Dispatcher.dispatch({
              type: ActionTypes.ZIPCODE_NOT_SERVED,
              payload: response.data
            });
            history.push("/service-not-available");
          } 
        }
        else{
          Dispatcher.dispatch({
            type: ActionTypes.CUSTOMER_CREATED,
            payload: response.data
          });
          document.cookie = "customer="+response.data.id+";expires=Thu, 01 Aug 2019 00:00:00 UTC; path=/;"
          history.push("/signup/pricing/");
        }
      }
    });
  },

  completeSignUp(customer, history){
    Dispatcher.dispatch({
      type: ActionTypes.ADD_CUSTOMER_START
    });

    ApiClient.completeSignUp(customer,(response, error) => {
      if (error){
        Dispatcher.dispatch({
          type: ActionTypes.ADD_CUSTOMER_ERROR,
          payload: response
        });
      }
      else{
        if(response.status === 200){
          if (response.data.error_code === "zipcode_not_served"){
            Dispatcher.dispatch({
              type: ActionTypes.ZIPCODE_NOT_SERVED,
              payload: response.data
            });
            history.push("/service-not-available");
          } 
        }
        else{
          Dispatcher.dispatch({
            type: ActionTypes.ADD_CUSTOMER_SUCCESS,
            payload: response.data
          });
          document.cookie = "customer="+response.data.user.id+";expires=Thu, 01 Aug 2019 00:00:00 UTC; path=/;"
          history.push("/account/current/");
        }
      }
    });
  },

  selectPlan(email, meal_plan, history){
    setTimeout(() => { 
      Dispatcher.dispatch({
        type: ActionTypes.PLAN_SELECT_START
      })
    }, 1);

    ApiClient.selectMealPlan(email, meal_plan,(response, error) => {
      if (error){
        Dispatcher.dispatch({
          type: ActionTypes.PLAN_SELECT_ERROR,
          payload: response
        });
      }
      else{
        Dispatcher.dispatch({
          type: ActionTypes.PLAN_SELECT_SUCCESS,
          payload: meal_plan
        });
        history.push("/signup/checkout/");
      }
    });
  }
};

export default SignUpAction;