import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { assets } from "../../assets/Asset";
import { Showcontext } from "../../context/Showcontext";
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false); 
  const {  token, setToken,role, setRole } = useContext(Showcontext);
   const navigate=useNavigate();
    const logout=()=>{
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setToken("");
      setRole("");
      navigate("/")
    }

  return (
    <div className="navbar">
      <img className="Logo" src={assets.logo} alt="Logo" />
      <div className="Profile-container">
        <img
          className="Profile"
          src={assets.profile_image}
          alt="Profile"
          onClick={() => setShowDropdown(!showDropdown)} 
        />
        {showDropdown && (
          <div className="Dropdown">
            <button className="Logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
