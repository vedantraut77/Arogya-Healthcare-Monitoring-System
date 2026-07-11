import React from "react";
import { Outlet } from "react-router-dom";

import GeneralNavBar from "../components/common/GeneralNavBar";

const PublicLayout = () => {
  return (
    <>
      <GeneralNavBar />
      <Outlet />
    </>
  );
};

export default PublicLayout;