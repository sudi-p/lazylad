import React,{ Component } from 'react';
import { Container } from 'flux/utils';
import TiffinPlan from './TiffinPlan';
import TiffinPlanStore from '../stores/tiffinPlanStore';
import TiffinPlanActions from '../actions/tiffinPlanActions';


class TiffinPlanContainer extends Component{
  static getStores() {
    return [TiffinPlanStore];
  }

  static calculateState(prevState, props) {
    const state = TiffinPlanStore.getState();
    return {
      plan: state.get('plan'),
      isLoading: state.get('isLoading')
    };
  }
  componentWillMount(){
    TiffinPlanActions.fetchPlan(this.props.match.params.id);
  }
  render(){
    return(
      <TiffinPlan {...this.state} />
    )
  }
}

export default Container.create(TiffinPlanContainer)