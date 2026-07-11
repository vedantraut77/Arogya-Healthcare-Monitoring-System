import React, { useEffect, useState } from "react";

import PatientCard from "./PatientCard";
import PatientModal from "./PatientModal";

import { PATIENTS } from "../../constants/patients";
import { PATIENT_DETAILS } from "../../constants/patientDetails";
import { SETTINGS } from "../../constants/settings";

import DataService from "../../services/DataService";

const MockPatientProvider = () => {
  const [patientData, setPatientData] = useState(
    DataService.initializePatients()
  );

  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const updatePatients = async () => {
      const updatedPatients = DataService.updatePatients();

      await DataService.savePatients(updatedPatients);

      setPatientData(updatedPatients);
    };

    updatePatients();

    const interval = setInterval(
      updatePatients,
      SETTINGS.UPDATE_INTERVAL
    );

    return () => clearInterval(interval);
  }, []);

  const getPatientId = (name) => {
    const index = PATIENTS.indexOf(name);

    if (index === -1) return null;

    return `P${String(index + 1).padStart(3, "0")}`;
  };

  return (
    <>
      {PATIENTS.map((name) => {
        const data = patientData[name];

        if (!data) return null;

        const patient = {
          name,
          temperature: data.temperature,
          heartRate: data.heartRate,
          spo2: data.oxygenLevel,
          time: new Date().toLocaleTimeString(),
        };

        return (
          <PatientCard
            key={name}
            patient={patient}
            onClick={() =>
              setSelectedPatient({
                patient,
                details: PATIENT_DETAILS[getPatientId(name)],
              })
            }
          />
        );
      })}

      {selectedPatient && (
        <PatientModal
          patient={selectedPatient.patient}
          details={selectedPatient.details}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </>
  );
};

export default MockPatientProvider;