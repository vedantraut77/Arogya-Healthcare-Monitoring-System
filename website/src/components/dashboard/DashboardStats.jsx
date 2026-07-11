import React, { useEffect, useState } from "react";
import "./DashboardStats.css";
import DataService from "../../services/DataService";

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    avgTemp: null,
    avgSpO2: null,
    avgHR: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await DataService.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error("Failed to fetch dashboard statistics:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <h2>{stats.totalPatients}</h2>
        <p>Total Patients</p>
      </div>

      <div className="stat-card">
        <h2>{stats.avgTemp !== null ? `${stats.avgTemp}°C` : "--"}</h2>
        <p>Avg Temp</p>
      </div>

      <div className="stat-card">
        <h2>{stats.avgSpO2 !== null ? `${stats.avgSpO2}%` : "--"}</h2>
        <p>Avg SpO₂</p>
      </div>

      <div className="stat-card">
        <h2>{stats.avgHR !== null ? `${stats.avgHR} bpm` : "--"}</h2>
        <p>Avg Heart Rate</p>
      </div>
    </div>
  );
};

export default DashboardStats;