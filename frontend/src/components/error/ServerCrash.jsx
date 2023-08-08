import React from "react";
import "../styles/ErrorPage.module.css";

const ServerCrash = props => {
  return (
    <div className="server-crash errors">
      <div className="text-wrapper">
        <span className="title">Stay tuned</span>
        <div className="image" />
        <p>
          RedLentils is temporary unavailable, but we're working hard to fix the
          problem.We'll be up and running soon! Keep an eye on our Twitter
          account for updates.{" "}
        </p>
        <p>
          If you need help with an ongoing reservation or for urgent issues,
          tweet us{" "}
          <a href="https://twitter.com" alt="twitter account">
            @redlentils
          </a>{" "}
          or{" "}
          <a href="https://twitter.com" alt="phone number">
            call us.
          </a>
        </p>
        <p>
          {" "}
          Please note, during site downtime, our response times may be longer
          than usual.
        </p>
        Thanks for your patience.
      </div>
    </div>
  );
};

export default ServerCrash;
