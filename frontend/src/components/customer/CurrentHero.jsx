import React from "react";
import BlueButton from "../common/BlueButton";
import { NavLink } from "react-router-dom";

const CurrentHero = () => (
  <div className="current-hero">
    <div className="text-wrapper">
      <div className="text">
        <div className="title">GREAT FOR GRILLING</div>
        <div className="content">
          All summer long, we’re making some of our stovetop recipes adaptable
          for the grill. These recipes can be cooked either way. Just look for
          the badge and the alternate instructions on the recipe card.
        </div>
        <NavLink to="/account/upcoming/">
          <div className="bb-wrapper">
            <BlueButton text="VIEW MENU" />
          </div>
        </NavLink>
      </div>
    </div>
  </div>
);

export default CurrentHero;
