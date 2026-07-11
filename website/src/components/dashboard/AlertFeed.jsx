import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./AlertFeed.css";

import DataService from "../../services/DataService";
import { SETTINGS } from "../../constants/settings";
import { VITAL_LIMITS } from "../../constants/vitals";

const AlertFeed = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const updateAlert = () => {
      const patients = DataService.getPatients();

      let highestAlert = null;

      Object.entries(patients).forEach(([name, patient]) => {
        const issues = [];

        if (
          patient.temperature < VITAL_LIMITS.temperature.min ||
          patient.temperature > VITAL_LIMITS.temperature.max
        ) {
          issues.push({
            text: `Temperature ${patient.temperature}°C`,
            severity: 3,
          });
        }

        if (
          patient.heartRate < VITAL_LIMITS.heartRate.min ||
          patient.heartRate > VITAL_LIMITS.heartRate.max
        ) {
          issues.push({
            text: `Heart Rate ${patient.heartRate} bpm`,
            severity: 2,
          });
        }

        if (
          patient.oxygenLevel < VITAL_LIMITS.spo2.min
        ) {
          issues.push({
            text: `SpO₂ ${patient.oxygenLevel}%`,
            severity: 4,
          });
        }

        if (issues.length === 0) return;

        issues.sort((a, b) => b.severity - a.severity);

        const current = {
          patient: name,
          issue: issues[0].text,
          severity: issues[0].severity,
        };

        if (
          !highestAlert ||
          current.severity > highestAlert.severity
        ) {
          highestAlert = current;
        }
      });

      setAlert(highestAlert);
    };

    updateAlert();

    const interval = setInterval(
      updateAlert,
      SETTINGS.UPDATE_INTERVAL
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-alert">

      <div className="dashboard-alert-header">

        <h3>Dashboard Alert</h3>

        <Link
          to="/alerts"
          className="view-all"
        >
          View All
        </Link>

      </div>

      {!alert ? (

        <div className="dashboard-normal">
          All monitored patients are stable.
        </div>

      ) : (

        <Link
          to="/patients"
          className="dashboard-alert-card"
        >

          <div className="patient-name">
            {alert.patient}
          </div>

          <div className="patient-issue">
            {alert.issue}
          </div>

        </Link>

      )}

    </div>
  );
};

export default AlertFeed;