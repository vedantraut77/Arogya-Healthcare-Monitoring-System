import React from "react";
import { Link } from "react-router-dom";
import "./GeneralNavBar.css";
import logo from "../../assets/logo.png";

const GeneralNavBar = () => {
  return (
    <nav className="navbar">
      <Link
        to="/"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="logo-container">
          <img
            src={logo}
            alt="Arogya Healthcare"
            className="logo"
          />
          <span className="logo-text">
            Arogya Healthcare
          </span>
        </div>
      </Link>

      <ul className="navbar-nav">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li><Link to="/services">SERVICES</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
      </ul>

      <div className="Login-button">
        <Link to="/login">
          <button className="main-button">
            Login
          </button>

          <button className="plus-button">
            +
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default GeneralNavBar;