import React, { useEffect, useState } from "react";
import "./SystemInfo.css";

import { SETTINGS } from "../../constants/settings";
import DataService from "../../services/DataService";

const SystemInfo = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [stats, setStats] = useState({
    totalPatients: 0,
  });

  useEffect(() => {
    const updateInfo = async () => {
      const dashboardStats = await DataService.getDashboardStats();

      setStats(dashboardStats);
      setLastUpdated(new Date());
    };

    updateInfo();

    const interval = setInterval(
      updateInfo,
      SETTINGS.UPDATE_INTERVAL
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="system-info">

      <h3>System Information</h3>

      <div className="system-row">
        <span>System Status</span>
        <span>Healthy</span>
      </div>

      <div className="system-row">
        <span>Demo Mode</span>
        <span>Active</span>
      </div>

      <div className="system-row">
        <span>Refresh Rate</span>
        <span>{SETTINGS.UPDATE_INTERVAL / 1000} Seconds</span>
      </div>

      <div className="system-row">
        <span>Total Patients</span>
        <span>{stats.totalPatients}</span>
      </div>

      <div className="system-row">
        <span>Last Updated</span>
        <span>{lastUpdated.toLocaleTimeString()}</span>
      </div>

    </div>
  );
};

export default SystemInfo;