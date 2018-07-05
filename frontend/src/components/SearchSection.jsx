import React, { Component } from 'react';
import {
  Checkbox,
  Switch,
  Radio
} from 'antd';
import './styles/Search.module.css'

const CheckboxGroup = Checkbox.Group;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class SearchSection extends Component{
  constructor(){
    super();
    this.state ={
      search_options: {
        'vegeterian': false,
        'dish_type_options': [],
        'plan_type': 'all'
      }
    }
  }
  onDishTypeChange(dish_type){
    let options = this.state.search_options;
    options.dish_type_options = dish_type
    this.setState({
      search_options: options
    })
    console.log(this.state)
  }
  vegeterianDish(checked){
    let options = this.state.search_options;
    options.vegeterian = checked
    this.setState({
      search_options: options
    })
    console.log(this.state)
  }
  onPlanTypeChange(e){
    let options = this.state.search_options;
    options.plan_type = e.target.value
    this.setState({
      search_options: options
    })
    console.log(this.state)
  }
  render(){
    const dish_type_options = [
      { label: 'South Indian', value: 'south_indian' },
      { label: 'North Indian', value: 'north_indian' },
      { label: 'Nepali', value: 'nepali' },
    ];
    const plan_type_options=[
      {label: 'All Plans', value: 'all'},
      {label: '3 Day Plans', value: '3_day'},
      {label: '5 Day Plans', value: '5_day'},
      {label: '7 Day Plans', value: '7_day'},
    ]
    const dish_type_options_display = dish_type_options.map((option)=>{
      return <p key={option.value}><Checkbox value={option.value} ><span>{option.label}</span></Checkbox></p>
    })
    const plan_type_options_display = plan_type_options.map((option)=>{
      return <p key={option.value}><RadioButton value={option.value} ><span>{option.label}</span></RadioButton></p>
    })
    return(
      <div className="search">
        <p>Select the type:</p>
        <CheckboxGroup onChange={this.onDishTypeChange.bind(this)}>{dish_type_options_display}</CheckboxGroup>
        <p>Need Vegeterian Food?</p>
        <p><Switch checkedChildren="veg" onChange={this.vegeterianDish.bind(this)}/> Vegeterian</p>
        <p>Select a plan:</p>
         <RadioGroup defaultValue="all" size="small" onChange={this.onPlanTypeChange.bind(this)}>{plan_type_options_display}</RadioGroup>
      </div>
    );
  }
}

export default SearchSection
