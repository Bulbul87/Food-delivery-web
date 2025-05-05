import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar"; // Adjust path if necessary

const Admindash = () => {
  return (
    <div className="app-content">
      <Sidebar />
      <div className="app-content">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Admindash;
