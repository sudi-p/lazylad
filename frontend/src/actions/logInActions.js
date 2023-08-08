import Dispatcher from "../lib/dispatchers";
import ActionTypes from "../constants/actionTypes";
import ApiClient from "../client.js";

const LogInAction = {
  login(customer, history){
    Dispatcher.dispatch({
      type: ActionTypes.LOGIN_CUSTOMER_START
    });

    ApiClient.loginCustomer(customer,(response, error)=>{
      if (error){
        if(error.response.status === 401){
          Dispatcher.dispatch({
            type: ActionTypes.LOGIN_CUSTOMER_NOTMATCH,
            payload: response
          });
        }
      }
      else{
        if(response.status === 200){
          if (response.data.error_code){
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
              type: ActionTypes.LOGIN_CUSTOMER_SUCCESS,
              payload: response.data
            });
            if (response.data.user.signup_complete){
              if (customer.remember){
                document.cookie = "customer="+response.data.user.id+";expires=Thu, 01 Aug 2020 00:00:00 UTC; path=/;"
              }
              else{
                document.cookie = "customer="+response.data.user.id+"; path=/;"
              }
              history.replace("/account/current/");
            }
            else{
              history.push("/signup/pricing");
            }
          }
        }
      }
    });
  }
};

export default LogInAction;