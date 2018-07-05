import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { Switch, Route} from 'react-router-dom';

import IndividualDishActions from '../actions/individualDishActions';
import IndividualDishStore from '../stores/individualDishStore';
import IndividualDishView from './IndividualDishView';
import IndividualDishSave from './IndividualDishSave';

class IndividualDishContainer extends Component{
  static getStores(){
    return [IndividualDishStore];
  }
  static calculateState(prevState, props){
    const state = IndividualDishStore.getState();
    return {
      dish: state.get("dish")
    }
  }
  componentWillMount(){
    IndividualDishActions.fetchDish(this.props.match.params.id);
  }
  addDishInfo(dish_info){
    IndividualDishActions.addDishInfo(this.props.match.params.id, dish_info);
  }
  IndividualDishSaveRoute = () => {
    return (
      <IndividualDishSave addDishInfo={this.addDishInfo.bind(this)} />
    )
  }
  IndividualDishViewRoute = () =>{
    return(
      <IndividualDishView {...this.state}/>
    )
  }
  render(){
    console.log(this.state)
    return(
      <Switch>
        <Route path ="/dish/:id/dish-info/" render = {this.IndividualDishSaveRoute} />
        <Route path ="/dish/:id/" render = {this.IndividualDishViewRoute} />
      </Switch>
    );
  }
}

export default Container.create(IndividualDishContainer);