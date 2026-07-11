// src/constants/vitals.js

export const VITAL_LIMITS = {
  temperature: {
    min: 25,
    max: 40,
  },

  heartRate: {
    min: 60,
    max: 100,
  },

  spo2: {
    min: 95,
    max: 100,
  },
};

export const GENERATION_RANGES = {
  temperature: {
    min: 30,
    max: 45,
    delta: 0.3,
  },

  heartRate: {
    min: 40,
    max: 120,
    delta: 3,
  },

  oxygenLevel: {
    min: 85,
    max: 100,
    delta: 1,
  },
};