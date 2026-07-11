import React from "react";
import { Link } from "react-router-dom";
import "./Page.css";

const About = () => {
  return (
    <div className="page">

      <Link to="/" className="backBtn">
        ← Back to Home
      </Link>

      <h1>About Arogya</h1>

      <p>
        Arogya is a smart healthcare platform developed for remote patient
        monitoring using IoT sensors, Firebase Cloud and Artificial
        Intelligence.
      </p>

      <div className="info-grid">

        <div className="card">
          <h3>Mission</h3>
          <p>
            Deliver affordable and reliable healthcare monitoring anywhere.
          </p>
        </div>

        <div className="card">
          <h3>Vision</h3>
          <p>
            Connect patients and doctors through technology.
          </p>
        </div>

        <div className="card">
          <h3>Technology</h3>
          <p>
            React, Firebase, IoT, Machine Learning and Cloud Computing.
          </p>
        </div>

      </div>

    </div>
  );
};

export default About;