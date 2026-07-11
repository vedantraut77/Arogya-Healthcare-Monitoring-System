import React, { useEffect, useState } from "react";
import "./Alerts.css";

import DataService from "../../services/DataService";
import { SETTINGS } from "../../constants/settings";
import { VITAL_LIMITS } from "../../constants/vitals";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const updateAlerts = () => {
      const patients = DataService.getPatients();

      const activeAlerts = [];

      Object.entries(patients).forEach(([name, patient]) => {
        const issueList = [];

        if (
          patient.temperature < VITAL_LIMITS.temperature.min ||
          patient.temperature > VITAL_LIMITS.temperature.max
        ) {
          issueList.push(`Temperature ${patient.temperature}°C`);
        }

        if (
          patient.heartRate < VITAL_LIMITS.heartRate.min ||
          patient.heartRate > VITAL_LIMITS.heartRate.max
        ) {
          issueList.push(`Heart Rate ${patient.heartRate} bpm`);
        }

        if (
          patient.oxygenLevel < VITAL_LIMITS.spo2.min ||
          patient.oxygenLevel > VITAL_LIMITS.spo2.max
        ) {
          issueList.push(`SpO₂ ${patient.oxygenLevel}%`);
        }

        if (issueList.length > 0) {
          activeAlerts.push({
            patient: name,
            issue: issueList.join(" • "),
          });
        }
      });

      activeAlerts.sort((a, b) =>
        a.patient.localeCompare(b.patient)
      );

      setAlerts(activeAlerts.slice(0, 5));
    };

    updateAlerts();

    const interval = setInterval(
      updateAlerts,
      SETTINGS.UPDATE_INTERVAL
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="alerts-page">

      <div className="alerts-header">
        <h2>Patient Alerts</h2>

        <span className="alert-count">
          {alerts.length} Active
        </span>
      </div>

      {alerts.length === 0 ? (
        <div className="all-good">
          ✅ All Patients Stable
        </div>
      ) : (
        <ul className="alert-list">

          {alerts.map((alert, index) => (

            <li
              key={index}
              className="alert-row"
            >

              <div className="alert-name">
                ⚠ {alert.patient}
              </div>

              <div className="alert-issue">
                {alert.issue}
              </div>

            </li>

          ))}

        </ul>
      )}

    </div>
  );
};

export default Alerts;