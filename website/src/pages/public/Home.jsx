import React from "react";
import { Link } from "react-router-dom";

import "./Home.css";

import heroImage from "../../assets/img2.svg";

const Home = () => {
  return (
    <div className="home-page">

      {/* Hero */}

      <section className="hero">

        <div className="heroText">

          <h1>
            Real-Time Healthcare
            <br />
            <span>Monitoring Platform</span>
          </h1>

          <p>
            Monitor patients remotely with IoT sensors, cloud storage,
            emergency alerts and AI-based healthcare prediction.
          </p>

          <div className="heroButtons">

            <Link
              to="/about"
              className="primaryBtn"
            >
              Learn More
            </Link>

            <Link
              to="/services"
              className="secondaryBtn"
            >
              Explore Services
            </Link>

          </div>

        </div>

        <div className="heroImage">

          <img
            src={heroImage}
            alt="Arogya Healthcare"
          />

        </div>

      </section>

      {/* Features */}

      <section className="features">

        <h2>Why Choose Arogya?</h2>

        <div className="cards">

          <div className="card">

            <h3>Live Monitoring</h3>

            <p>
              Monitor heart rate, temperature, SpO₂ and patient vitals in
              real time.
            </p>

          </div>

          <div className="card">

            <h3>Emergency Alerts</h3>

            <p>
              Automatic notifications to doctors and guardians whenever
              abnormal readings occur.
            </p>

          </div>

          <div className="card">

            <h3>Secure Cloud</h3>

            <p>
              Firebase securely stores patient records and complete medical
              history.
            </p>

          </div>

          <div className="card">

            <h3>AI Prediction</h3>

            <p>
              Machine learning predicts potential health risks before
              emergencies occur.
            </p>

          </div>

        </div>

      </section>

      {/* About */}

      <section className="aboutSection">

        <h2>About Our Project</h2>

        <p>
          Arogya Healthcare is a Final Year Engineering Project that combines
          IoT devices, Firebase Cloud, React and Machine Learning to provide
          a complete real-time healthcare monitoring ecosystem.
        </p>

      </section>

      {/* Footer */}

      <footer>

        <p>
          © 2026 Arogya Healthcare | Final Year Project
        </p>

      </footer>

    </div>
  );
};

export default Home;