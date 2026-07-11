import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import "./PatientChart.css";

import DataService from "../../services/DataService";
import { SETTINGS } from "../../constants/settings";

const PatientChart = ({ name }) => {
  const [vitalsData, setVitalsData] = useState([]);

  useEffect(() => {
    const updateChart = () => {
      const patients = DataService.getPatients();

      if (!patients[name]) return;

      const current = patients[name];

      const newEntry = {
        temp: current.temperature,
        heartRate: current.heartRate,
        SpO2: current.oxygenLevel,
        time: new Date().toLocaleTimeString(),
      };

      setVitalsData((previous) => {
        const updated = [...previous, newEntry];

        return updated.slice(-20);
      });
    };

    updateChart();

    const interval = setInterval(
      updateChart,
      SETTINGS.UPDATE_INTERVAL
    );

    return () => clearInterval(interval);
  }, [name]);

  const latest = vitalsData[vitalsData.length - 1] || {};

return (
  <div className="chart-wrapper">
    <h2>{name} - Vitals Overview</h2>

    <div className="chart-stats">
      <div>
        <strong>Temperature: </strong>
        <span>{latest.temp ?? "--"}°C</span>
      </div>

      <div>
        <strong>Heart Rate: </strong>
        <span>{latest.heartRate ?? "--"} bpm</span>
      </div>

      <div>
        <strong>SpO₂: </strong>
        <span>{latest.SpO2 ?? "--"}%</span>
      </div>
    </div>

    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={vitalsData}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="time" />

        <YAxis />

        <Tooltip />

        <Legend />

        <Line
          type="monotone"
          dataKey="temp"
          stroke="#ff8c00"
          name="Temperature"
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="heartRate"
          stroke="#dc2626"
          name="Heart Rate"
          dot={false}
        />

        <Line
          type="monotone"
          dataKey="SpO2"
          stroke="#0ea5e9"
          name="SpO₂"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);
};

export default PatientChart;