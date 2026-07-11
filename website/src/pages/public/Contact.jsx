import React from "react";
import { Link } from "react-router-dom";
import "./Page.css";

const Contact = () => {
  return (
    <div className="page">

      <Link to="/" className="backBtn">
        ← Back to Home
      </Link>

      <h1>Contact Us</h1>

      <div className="info-grid">

        <div className="card">
          <h3>Email</h3>
          <p>support@arogyahealthcare.com</p>
        </div>

        <div className="card">
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
        </div>

        <div className="card">
          <h3>Address</h3>
          <p>Pune, Maharashtra, India</p>
        </div>

      </div>

    </div>
  );
};

export default Contact;