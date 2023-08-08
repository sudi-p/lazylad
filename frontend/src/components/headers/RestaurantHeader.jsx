import React from 'react'
import { NavLink } from 'react-router-dom';


class RestaurantHeader extends React.Component {
  render() {
    return(
      <div className="sidebar">
        <div className="title">
          LazyLad 
        </div>
        <NavLink to="/restaurant/">
          <div className="menu-item">
            Home
          </div>
        </NavLink>
      </div>
    )
  }
}

export default RestaurantHeader;