import React, { useEffect } from "react";
import { database, firestore } from "../../config/firebase";
import { ref, onValue } from "firebase/database";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { PATIENTS } from "../../constants/patients";

const RealTimeData = () => {
  useEffect(() => {
    const patientName = PATIENTS[0];

    const patientRef = ref(database, `SensorData/${patientName}`);

    const unsubscribe = onValue(patientRef, async (snapshot) => {
      const data = snapshot.val();

      if (!data) return;

      const { temperature, heartRate, SpO2 } = data;

      const tempVal = parseFloat(temperature);
      const heartRateVal = parseFloat(heartRate);
      const spO2Val = parseFloat(SpO2);

      if (!isNaN(tempVal) && tempVal >= 30 && tempVal <= 45) {
        const payload = {
          temp: tempVal,
          timestamp: serverTimestamp(),
        };

        if (!isNaN(heartRateVal)) payload.heartRate = heartRateVal;
        if (!isNaN(spO2Val)) payload.SpO2 = spO2Val;

        const vitalsRef = collection(
          firestore,
          "patients",
          patientName,
          "vitals"
        );

        const latestQuery = query(
          vitalsRef,
          orderBy("timestamp", "desc"),
          limit(1)
        );

        const querySnapshot = await getDocs(latestQuery);

        if (!querySnapshot.empty) {
          const latestDoc = querySnapshot.docs[0];

          await updateDoc(
            doc(
              firestore,
              "patients",
              patientName,
              "vitals",
              latestDoc.id
            ),
            payload
          );
        } else {
          await addDoc(vitalsRef, payload);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default RealTimeData;