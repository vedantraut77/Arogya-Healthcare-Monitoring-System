import React from "react";
import PatientCard from "./PatientCard.jsx";  // ✅ Importing the component

const PatientData = () => {
  return (
    <div>
      <h2>Patients</h2>
      <PatientCard name="randomPatient" /> {/* ✅ Rendering the card */}
    </div>
  );
};

export default PatientData;
