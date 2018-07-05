import Dispatcher from '../lib/dispatchers'
import ActionTypes from '../constants/actionTypes'
import ApiClient from '../client.js'

const SignUpAction = {
  checkCustomer(new_customer){
    Dispatcher.dispatch({
      type: ActionTypes.CHECK_CUSTOMER_START
    })

    ApiClient.checkCustomer(new_customer,(response, error)=>{
      if (error){
        Dispatcher.dispatch({
          type: ActionTypes.CHECK_CUSTOMER_ERROR,
          payload: response
        })
      }
      if(response.data === "Used"){
        Dispatcher.dispatch({
          type: ActionTypes.EMAIL_ALREADY_USED,
          payload: response
        })
      }
      else{
        Dispatcher.dispatch({
          type: ActionTypes.EMAIL_NOT_USED,
          payload: response
        })
        if( sessionStorage.getItem('pricing')){
          window.location.href = "/signup/checkout/"
        } else{
          window.location.href = "/signup/pricing/" 
        }
      }
    })
  },
  addCustomer(new_customer){
    Dispatcher.dispatch({
      type: ActionTypes.ADD_CUSTOMER_START
    })

    ApiClient.addCustomer(new_customer,(response, error)=>{
      if (error){
        Dispatcher.dispatch({
          type: ActionTypes.ADD_CUSTOMER_ERROR,
          payload: response
        })
      }
      else{
        Dispatcher.dispatch({
          type: ActionTypes.ADD_CUSTOMER_SUCCESS,
          payload: response
        })
      }
    })
  }
}

export default SignUpAction