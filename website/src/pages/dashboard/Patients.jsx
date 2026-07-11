import React, { useEffect } from "react";
import MockPatientProvider from "../../components/patients/MockPatientProvider";


import "./Patients.css";

const Patients = () => {

  useEffect(() => {
    document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  return (
    <div className="patients-container">
      <MockPatientProvider />
    </div>
  );
};

export default Patients;