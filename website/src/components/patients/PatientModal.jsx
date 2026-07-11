import React from "react";
import "./PatientModal.css";

const PatientModal = ({ patient, details, onClose }) => {
  if (!patient || !details) return null;

  const handleAmbulance = () => {
    const confirmed = window.confirm(
      `Dispatch ambulance for ${details.name}?`
    );

    if (confirmed) {
      window.alert(
        `🚑 Ambulance dispatched successfully.\n\nPatient: ${details.name}\nLocation: ${details.location.area}\nNearest Hospital: ${details.location.nearestHospital}`
      );
    }
  };

  const handleGuardian = () => {
    window.alert(
      `📞 Emergency notification sent.\n\nGuardian: ${details.guardian.name}\nPhone: ${details.guardian.phone}`
    );
  };

  const handleLocation = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${details.location.latitude},${details.location.longitude}`,
      "_blank"
    );
  };

  const getStatus = () => {
    if (
      patient.temperature > 38 ||
      patient.spo2 < 95 ||
      patient.heartRate > 100 ||
      patient.heartRate < 60
    ) {
      return "Critical";
    }

    return "Stable";
  };

  return (
    <div className="modal-overlay">

      <div className="patient-modal">

        <button
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Patient Details</h2>

        <div className="modal-top">

          <img
            src={details.photo}
            alt={details.name}
            className="patient-photo"
          />

          <div className="patient-basic">

            <div className="detail-row">
              <strong>Name</strong>
              <span>{details.name}</span>
            </div>

            <div className="detail-row">
              <strong>Patient ID</strong>
              <span>{details.id}</span>
            </div>

            <div className="detail-row">
              <strong>Age</strong>
              <span>{details.age}</span>
            </div>

            <div className="detail-row">
              <strong>Gender</strong>
              <span>{details.gender}</span>
            </div>

            <div className="detail-row">
              <strong>Blood Group</strong>
              <span>{details.bloodGroup}</span>
            </div>

          </div>

        </div>

        <div className="section">

          <h3>Current Vitals</h3>

          <div className="detail-row">
            <strong>Temperature</strong>
            <span>{patient.temperature}°C</span>
          </div>

          <div className="detail-row">
            <strong>Heart Rate</strong>
            <span>{patient.heartRate} bpm</span>
          </div>

          <div className="detail-row">
            <strong>SpO₂</strong>
            <span>{patient.spo2}%</span>
          </div>

          <div className="detail-row">
            <strong>Status</strong>

            <span
              className={
                getStatus() === "Stable"
                  ? "stable"
                  : "critical"
              }
            >
              {getStatus()}
            </span>

          </div>

        </div>

        <div className="section">

          <h3>Guardian</h3>

          <div className="detail-row">
            <strong>Name</strong>
            <span>{details.guardian.name}</span>
          </div>

          <div className="detail-row">
            <strong>Relation</strong>
            <span>{details.guardian.relation}</span>
          </div>

          <div className="detail-row">
            <strong>Phone</strong>
            <span>{details.guardian.phone}</span>
          </div>

        </div>

        <div className="section">

          <h3>Location</h3>

          <div className="detail-row">
            <strong>Area</strong>
            <span>{details.location.area}</span>
          </div>

          <div className="detail-row">
            <strong>Nearest Hospital</strong>
            <span>{details.location.nearestHospital}</span>
          </div>

        </div>

        <div className="modal-actions">

          <button
            className="location-btn"
            onClick={handleLocation}
          >
            View Location
          </button>

          <button
            className="guardian-btn"
            onClick={handleGuardian}
          >
            Notify Guardian
          </button>

          <button
            className="ambulance-btn"
            onClick={handleAmbulance}
          >
            Call Ambulance
          </button>

          <button
            className="close-modal-btn"
            onClick={onClose}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default PatientModal;