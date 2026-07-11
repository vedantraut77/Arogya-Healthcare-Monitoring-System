import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import "./NavBar.css";
import "./LogoutButton.css";

import { auth } from "../../config/firebase";
import logo from "../../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);

    window.location.href = "/";

  } catch (err) {
    console.error("Logout error:", err);
  }
};

  return (
    <nav className="navbar">
      <Link
        to="/dashboard"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="logo-container">
          <img
            src={logo}
            alt="Arogya Logo"
            className="logo"
          />

          <span className="logo-text">
            Arogya Healthcare
          </span>
        </div>
      </Link>

      <ul className="navbar-nav">
        <li><Link to="/dashboard">DASHBOARD</Link></li>
        <li><Link to="/patients">PATIENTS</Link></li>
        <li><Link to="/analytics">ANALYTICS</Link></li>
        <li><Link to="/alerts">ALERTS</Link></li>
      </ul>

      <div className="profile-button">
        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;