import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import DishesContainer from './DishesContainer';
import PageNotFound from './PageNotFound';
import IndividualDishContainer from './IndividualDishContainer';


import './styles/Main.module.css';

const Main = () => (
  <main className="main">
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/dishes' component={DishesContainer}/>
      <Route path='/dish/:id' component={IndividualDishContainer}/>
      <Route component={PageNotFound} />
    </Switch>
  </main>
);

export default Main