import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../config/firebase";

import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      navigate("/dashboard");

    } catch (err) {

      switch (err.code) {

        case "auth/user-not-found":
          setError("This user is not approved.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;

        default:
          setError("Login failed.");
      }
    }
  };

  return (

    <div className={styles.loginPage}>

      {/* Left */}

      <div className={styles.leftSection}>

        <h1>Arogya Healthcare</h1>

        <p>
          Secure access to the real-time healthcare monitoring dashboard.
        </p>

        <ul>

          <li>✓ Real-time Patient Monitoring</li>

          <li>✓ AI Health Prediction</li>

          <li>✓ Emergency Alert System</li>

          <li>✓ Cloud-based Medical Records</li>

        </ul>

        <Link
          to="/"
          className={styles.backBtn}
        >
          ← Back to Home
        </Link>

      </div>

      {/* Right */}

      <div className={styles.rightSection}>

        <form
          className={styles.loginCard}
          onSubmit={handleLogin}
        >

          <h2>Login</h2>

          <p>
            Sign in to continue
          </p>

          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>

  );
};

export default Login;