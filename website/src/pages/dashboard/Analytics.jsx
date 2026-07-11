import React, { useState } from "react";
import PatientChart from "../../components/analytics/PatientChart";
import { PATIENTS } from "../../constants/patients";


import "./Analytics.css";

const Analytics = () => {

  const [selectedPatient, setSelectedPatient] = useState(PATIENTS[0]);

  return (
    <div className="analytics-container">

      <div className="analytics-selector">

        {PATIENTS.map((name) => (

          <button
            key={name}
            className={
              selectedPatient === name
                ? "patient-tab active"
                : "patient-tab"
            }
            onClick={() => setSelectedPatient(name)}
          >
            {name}
          </button>

        ))}

      </div>

      <PatientChart name={selectedPatient} />

    </div>
  );
};

export default Analytics;