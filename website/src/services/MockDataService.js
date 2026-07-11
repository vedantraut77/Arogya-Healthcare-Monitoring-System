import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../config/firebase";

import { PATIENTS } from "../constants/patients";
import { GENERATION_RANGES } from "../constants/vitals";

let patients = {};

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

const generateInitialVitals = () => ({
  temperature: +(
    Math.random() *
      (GENERATION_RANGES.temperature.max -
        GENERATION_RANGES.temperature.min) +
    GENERATION_RANGES.temperature.min
  ).toFixed(1),

  heartRate: Math.floor(
    Math.random() *
      (GENERATION_RANGES.heartRate.max -
        GENERATION_RANGES.heartRate.min) +
      GENERATION_RANGES.heartRate.min
  ),

  oxygenLevel: Math.floor(
    Math.random() *
      (GENERATION_RANGES.oxygenLevel.max -
        GENERATION_RANGES.oxygenLevel.min) +
      GENERATION_RANGES.oxygenLevel.min
  ),
});

const applySmoothFluctuation = (
  value,
  delta,
  min,
  max,
  isFloat = false
) => {
  const change = (Math.random() * 2 - 1) * delta;

  const updated = value + change;

  return isFloat
    ? +clamp(updated, min, max).toFixed(1)
    : Math.round(clamp(updated, min, max));
};

export const initializePatients = () => {
  if (Object.keys(patients).length > 0) {
    return { ...patients };
  }

  PATIENTS.forEach((name) => {
    patients[name] = generateInitialVitals();
  });

  return { ...patients };
};

export const updatePatients = () => {
  const updatedPatients = {};

  Object.keys(patients).forEach((name) => {
    const patient = patients[name];

    updatedPatients[name] = {
      temperature: applySmoothFluctuation(
        patient.temperature,
        GENERATION_RANGES.temperature.delta,
        GENERATION_RANGES.temperature.min,
        GENERATION_RANGES.temperature.max,
        true
      ),

      heartRate: applySmoothFluctuation(
        patient.heartRate,
        GENERATION_RANGES.heartRate.delta,
        GENERATION_RANGES.heartRate.min,
        GENERATION_RANGES.heartRate.max
      ),

      oxygenLevel: applySmoothFluctuation(
        patient.oxygenLevel,
        GENERATION_RANGES.oxygenLevel.delta,
        GENERATION_RANGES.oxygenLevel.min,
        GENERATION_RANGES.oxygenLevel.max
      ),
    };
  });

  patients = updatedPatients;

  return { ...updatedPatients };
};

export const savePatients = async (patients) => {
  for (const name in patients) {
    const vitals = patients[name];

    const vitalsRef = collection(
      firestore,
      "patients",
      name,
      "vitals"
    );

    await addDoc(vitalsRef, {
      temp: vitals.temperature,
      heartRate: vitals.heartRate,
      SpO2: vitals.oxygenLevel,
      timestamp: serverTimestamp(),
    });
  }
};

export const getDashboardStats = async () => {
  const patientList = Object.values(patients);

  let tempSum = 0;
  let spo2Sum = 0;
  let hrSum = 0;

  patientList.forEach((patient) => {
    tempSum += patient.temperature;
    spo2Sum += patient.oxygenLevel;
    hrSum += patient.heartRate;
  });

  const count = patientList.length;

  return {
    totalPatients: count,
    avgTemp: count ? (tempSum / count).toFixed(1) : null,
    avgSpO2: count ? (spo2Sum / count).toFixed(1) : null,
    avgHR: count ? (hrSum / count).toFixed(1) : null,
  };
};

export const getPatients = () => {
  return { ...patients };
};