import React, { Component } from 'react';
import './styles/LandingPage.module.css';
import Processes from './landingpage/Process';
import Hero from './landingpage/Hero';
import Pricing from './landingpage/Pricing';
import Why from './landingpage/Why';
import FeaturedMenus from './landingpage/FeaturedMenus';

class LandingPage extends Component{
  render(){
    return(
      <div className="landing">
        <Hero />
        <Pricing />
        <FeaturedMenus />
        <Why />
        <Processes />
      </div>
    );
  }
}

export default LandingPage;
