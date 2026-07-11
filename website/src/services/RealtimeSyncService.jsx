import React, { useEffect } from "react";

import { database, firestore } from "../config/firebase";
import { PATIENTS } from "../constants/patients";

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

const RealtimeSyncService = () => {
  useEffect(() => {
    const patientName = PATIENTS[0].name;

    const patientRef = ref(database, `SensorData/${patientName}`);

    const unsubscribe = onValue(patientRef, async (snapshot) => {
      try {
        const data = snapshot.val();

        if (!data) return;

        const tempVal = parseFloat(data.temperature);
        const heartRateVal = parseFloat(data.heartRate);
        const spO2Val = parseFloat(data.SpO2);

        if (isNaN(tempVal) || tempVal < 30 || tempVal > 45) {
          return;
        }

        const payload = {
          temp: tempVal,
          timestamp: serverTimestamp(),
        };

        if (!isNaN(heartRateVal)) {
          payload.heartRate = heartRateVal;
        }

        if (!isNaN(spO2Val)) {
          payload.SpO2 = spO2Val;
        }

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
      } catch (error) {
        console.error("Realtime synchronization failed:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  return null;
};

export default RealtimeSyncService;