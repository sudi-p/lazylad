import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class TiffinPlanHeader extends Component{
  render(){
    let restaurant = this.props.restaurant
    let restaurant_name = ""
    let open_time= ''
    let close_time= ''
    let star= 0
    let url = ""
    if (restaurant){
      restaurant_name = restaurant.get('restaurant_name');
      open_time = restaurant.get('open_time');
      close_time = restaurant.get('close_time');
      star = parseInt(restaurant.get('rating'),10);
      url = restaurant.get('logo_url');
    }
    let image_url = <img src={url} alt='cover' />
    return(
      <section className="restaurant-header">
        <div className="cover-image"></div>
        <div className="header-wrapper">
          <div className="logo">
            {image_url}
          </div>
          <div className="info-wrapper">
            <h1 className="title">{restaurant_name}</h1>
            <StarRatings
              rating={star}
              starRatedColor="#1890ff"
              starEmptyColor="white"
              starDimension="15px"
              starSpacing='3px'
              changeRating={this.changeRating}
              numberOfStars={5}/>
            <h3>Open Hours: <strong> {open_time} - {close_time} </strong></h3>
          </div>
        </div>
      </section>
    );
  }
}

export default TiffinPlanHeader