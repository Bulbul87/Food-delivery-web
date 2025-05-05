import React, { useContext, useState } from "react";
import "./userNavbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Showcontext } from "../../context/Showcontext";
import { assets } from "../../assets/assets";
const UserNavbar = ({ setshowlogin }) => {
  const [menu, setmenu] = useState("menu");
  const { getTotalcartamount, token, setToken } = useContext(Showcontext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <div className="user-navbar">
      <Link to="/">
        {" "}
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="user-navbar-menu">
        <Link
          to="/"
          onClick={() => setmenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setmenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => setmenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setmenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalcartamount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setshowlogin(true)}>sign in</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="bagicon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logouticon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavbar;
