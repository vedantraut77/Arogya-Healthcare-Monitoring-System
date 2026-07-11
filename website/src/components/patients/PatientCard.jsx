import React from "react";
import "./PatientCard.css";

import { VITAL_LIMITS } from "../../constants/vitals";

const isAbnormal = {
  temperature: (v) =>
    v < VITAL_LIMITS.temperature.min || v > VITAL_LIMITS.temperature.max,

  heartRate: (v) =>
    v < VITAL_LIMITS.heartRate.min || v > VITAL_LIMITS.heartRate.max,

  spo2: (v) =>
    v < VITAL_LIMITS.spo2.min || v > VITAL_LIMITS.spo2.max,
};

const PatientCard = ({ patient, onClick }) => {
  if (!patient) return null;

  const formatClass = (param, value) =>
    isAbnormal[param](value) ? "abnormal" : "";

  const status =
    isAbnormal.temperature(patient.temperature) ||
    isAbnormal.heartRate(patient.heartRate) ||
    isAbnormal.spo2(patient.spo2)
      ? "Critical"
      : "Stable";

  return (
    <div className="patient-card" onClick={onClick}>
      <div className="patient-header">

        <span>{patient.name}</span>

        <span
          className={
            status === "Stable"
              ? "status-good"
              : "status-critical"
          }
        >
          {status}
        </span>

      </div>

      <div className="patient-info">

        <p className={formatClass("temperature", patient.temperature)}>
          <strong>Temperature : </strong>
          <span>{patient.temperature}°C</span>
        </p>

        <p className={formatClass("heartRate", patient.heartRate)}>
          <strong>Heart Rate : </strong>
          <span>{patient.heartRate} bpm</span>
        </p>

        <p className={formatClass("spo2", patient.spo2)}>
          <strong>SpO₂ : </strong>
          <span>{patient.spo2}%</span>
        </p>

        <p className="timestamp">
          <strong>Updated</strong>
          <span>{patient.time}</span>
        </p>

      </div>

      <div className="patient-footer">
        Click for Patient Details
      </div>

    </div>
  );
};

export default PatientCard;