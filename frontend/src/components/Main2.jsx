import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpContainer from './SignUpContainer';
import LogInContainer from './LogInContainer';
import LandingPage from './LandingPage';
import PageNotFound from './PageNotFound';
import TiffinPlanContainer from './TiffinPlanContainer';
import MenuContainer from './MenuContainer';
import PlansView from './PlansView';
import IndividualDishContainer from './IndividualDishContainer';

import './styles/Main.module.css';
import './styles/Style.module.css';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route path='/signup/' component={SignUpContainer}/>
      <Route path='/login/' component={LogInContainer}/>
      <Route path='/menu/' component={MenuContainer}/>
      <Route path='/mealplans/' component={PlansView}/>
      <Route path='/tiffin-plan/:id/' component={TiffinPlanContainer}/>
      <Route path='/dish/:id' component={IndividualDishContainer}/>
      <Route component={PageNotFound} />
    </Switch>
  </main>
);

export default Main