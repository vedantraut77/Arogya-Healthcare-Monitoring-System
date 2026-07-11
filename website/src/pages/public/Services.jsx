import React from "react";
import { Link } from "react-router-dom";
import "./Page.css";

const Services = () => {
  return (
    <div className="page">

      <Link to="/" className="backBtn">
        ← Back to Home
      </Link>

      <h1>Healthcare Services</h1>

      <div className="info-grid">

        <div className="card">
          <h3>Live Patient Monitoring</h3>
          <p>Continuous monitoring of patient vital signs.</p>
        </div>

        <div className="card">
          <h3>Emergency Alerts</h3>
          <p>Instant notifications during abnormal conditions.</p>
        </div>

        <div className="card">
          <h3>Doctor Dashboard</h3>
          <p>Manage patients and review reports.</p>
        </div>

        <div className="card">
          <h3>AI Health Prediction</h3>
          <p>Predict health risks using machine learning.</p>
        </div>

        <div className="card">
          <h3>Cloud Storage</h3>
          <p>Secure Firebase database for patient records.</p>
        </div>

        <div className="card">
          <h3>Guardian Notifications</h3>
          <p>SMS and email alerts to family members.</p>
        </div>

      </div>

    </div>
  );
};

export default Services;