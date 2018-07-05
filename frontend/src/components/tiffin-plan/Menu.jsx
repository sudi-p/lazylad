import React, { Component } from 'react';

class Menu extends Component{
  render(){
  	let menu_start_date = this.props.start_date
  	const menu_end_date = this.props.end_date
    let dishes = this.props.dishes
    let dishes_display =[]
    if(dishes){
      dishes_display = dishes.map((dish, index)=>{
        return(
        <DishCard key={index} id={index+1} dish_name={dish.get('dish_name')} dish_information={dish.get('description')} />
      )
      })
    }
  	
    return(
      <section className="menu">
        <div className="menu-header">Menu {menu_start_date} - {menu_end_date} </div>
        {dishes_display}
      </section>
    );
  }
}

class DishCard extends Component{
	render(){
		return(
			<div className="dish-card">
				<div className="day">
					<h3 className="title"> Day {this.props.id} </h3>
				</div>
				<div className="card">
					<h3 className="title">{this.props.dish_name}</h3>
					<h4 className="information">{this.props.dish_information}</h4>
				</div>
			</div>
		)
	}
}

export default Menu;