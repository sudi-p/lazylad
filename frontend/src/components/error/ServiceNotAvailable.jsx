import React from "react";
import { NavLink } from "react-router-dom";

const ServiceNotAvailable = props => {
  return (
    <div className="service-not-available errors">
      <div className="text-wrapper">
        <span className="title">Service Not Available</span>
        <div className="image" />

        <p>
          RedLentils is currently unavailable in your area, but we're working
          hard to expand our services area.
        </p>

        <p>
          We will contact you via the email you provided when the service is
          available to your area. Keep an eye on our Twitter account{" "}
          <a href="https://twitter.com" alt="twitter account">
            @redlentils
          </a>{" "}
          for updates.
        </p>

        <p>Thank you for the interest to join us. </p>

        <NavLink to="/">Go Back to Redlentils.</NavLink>
      </div>
    </div>
  );
};

export default ServiceNotAvailable;
