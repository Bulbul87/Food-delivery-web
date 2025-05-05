import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Showcontext } from "../../context/Showcontext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, token } = useContext(Showcontext);

 if (!allowedRoles.includes(role)) {
   
   return <Navigate to="/unauthorized" replace />;
 }
  if (!token) {
   
    return <Navigate to="/" replace />;
  }


 
  return children;
};

export default ProtectedRoute;
