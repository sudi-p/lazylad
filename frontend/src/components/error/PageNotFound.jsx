import React from "react";
import { NavLink } from "react-router-dom";

const ServiceNotAvailable = props => {
  return (
    <div className="page-not-found errors">
      <div className="text-wrapper">
        <span className="title">Page Not Available</span>
        <div className="image" />

        <p>Sorry, this page isn't available</p>

        <p>
          The link you followed may be broken , or the page may have been
          removed.
        </p>

        <NavLink to="/">Go Back to Redlentils.</NavLink>
      </div>
    </div>
  );
};

export default ServiceNotAvailable;
