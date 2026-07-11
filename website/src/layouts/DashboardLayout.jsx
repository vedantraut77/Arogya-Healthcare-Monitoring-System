import React from "react";
import { Outlet } from "react-router-dom";

import NavBar from "../components/common/NavBar";

const DashboardLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default DashboardLayout;