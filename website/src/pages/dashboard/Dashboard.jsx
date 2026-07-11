import React from "react";

import AlertFeed from "../../components/dashboard/AlertFeed";
import DashboardStats from "../../components/dashboard/DashboardStats";
import SystemInfo from "../../components/dashboard/SystemInfo";
import NavBar from "../../components/common/NavBar";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <AlertFeed />
      <DashboardStats />
      <SystemInfo />
    </div>
  );
};

export default Dashboard;