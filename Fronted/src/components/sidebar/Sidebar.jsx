import React from "react";
import "./sidebar.css";
import { assets } from "../../assets/Asset";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/admin-dashboard/add" className="sidebar-option">
          <img  src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink  to="/admin-dashboard/list" className="sidebar-option">
          <img   src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink  to="/admin-dashboard/order" className="sidebar-option">
          <img   src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
