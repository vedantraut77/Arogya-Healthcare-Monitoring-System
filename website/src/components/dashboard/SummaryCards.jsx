import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import "./SummaryCards.css";

const SummaryCards = () => {
  const [summary, setSummary] = useState({
    total: 0,
    avgTemp: 0,
    avgSpO2: 0,
    avgHeartRate: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      const patientsRef = collection(firestore, "patients");
      const snapshot = await getDocs(patientsRef);

      let tempSum = 0, spO2Sum = 0, hrSum = 0, count = 0;

      for (let doc of snapshot.docs) {
        const vitalsRef = collection(firestore, "patients", doc.id, "vitals");
        const vitalsSnap = await getDocs(vitalsRef);

        if (!vitalsSnap.empty) {
          const latest = vitalsSnap.docs[0].data();
          tempSum += latest.temp || 0;
          spO2Sum += latest.SpO2 || 0;
          hrSum += latest.heartRate || 0;
          count++;
        }
      }

      setSummary({
        total: count,
        avgTemp: (tempSum / count).toFixed(1),
        avgSpO2: (spO2Sum / count).toFixed(1),
        avgHeartRate: (hrSum / count).toFixed(1),
      });
    };

    fetchSummary();
  }, []);

  return (
    <div className="summary-cards">
      <div className="card"><h3>{summary.total}</h3><p>Total Patients</p></div>
      <div className="card"><h3>{summary.avgTemp}°C</h3><p>Avg Temp</p></div>
      <div className="card"><h3>{summary.avgSpO2}%</h3><p>Avg SpO2</p></div>
      <div className="card"><h3>{summary.avgHeartRate} bpm</h3><p>Avg Heart Rate</p></div>
    </div>
  );
};

export default SummaryCards;
