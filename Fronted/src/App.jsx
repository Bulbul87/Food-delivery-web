import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import UserNavbar from "./components/usernavbar/usernavbar";
import Navbar from "./components/navbar/Navbar"; 
import Footer from "./components/footer/Footer";
import Loginpopup from "./components/Loginpopup/Loginpopup";
import ProtectedRoute from "./components/protectedroute/Protected";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Place from "./pages/placeorder/Place";
import Verify from "./pages/verify/Verify";
import Myorder from "./pages/myorder/Myorder";
import Admindash from "./pages/SUPERADMIN/admindash";
import Unauthorized from "./pages/unauthorize/Unauthorizedperson";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Order from "./pages/Orders/Order";

function App() {
  const [showlogin, setshowlogin] = useState(false);
  const [role, setRole] = useState(null); 
  const location = useLocation(); 

  
  useEffect(() => {
    if (location.pathname.startsWith("/admin-dashboard")) {
      setRole("admin");
    } else {
      setRole("user");
    }
  }, [location]);

  return (
    <>
      {showlogin && <Loginpopup setshowlogin={setshowlogin} />}
      <div >
        {/* Render Navbar based on role */}
        {role === "admin" ? (
          <Navbar  setRole={setRole} />
        ) : (
          <UserNavbar setshowlogin={setshowlogin} />
        )}

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Protected Routes */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={"user"}>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/place"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Place />
              </ProtectedRoute>
            }
          />
          <Route
            path="/verify"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Verify />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myorders"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Myorder />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard Routes */}
          <Route
            path="/admin-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Admindash />
              </ProtectedRoute>
            }
          >
            {/* Nested Routes */}
            <Route path="add" element={<Add />} />
            <Route path="list" element={<List />} />
            <Route path="order" element={<Order />} />
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
