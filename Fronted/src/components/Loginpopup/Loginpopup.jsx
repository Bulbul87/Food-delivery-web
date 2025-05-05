import React, { useContext, useState } from "react";
import "./loginpop.css";
import { assets } from "../../assets/assets";
import { Showcontext } from "../../context/Showcontext";
import axios from "axios";

const Loginpopup = ({ setshowlogin }) => {
  const { url, setToken } = useContext(Showcontext);

  const [currstate, setcurrstate] = useState("sign up");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const SUPERADMIN_CREDENTIALS = {
    email: "admin@gmail.com", 
    password: "ADMIN@1234#", 
  };

  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  //  redirection in login & signup
  const onlogin = async (event) => {
    event.preventDefault();
    let newurl = url;
    if (currstate === "Login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }

    try {
      const response = await axios.post(newurl, data);
      console.log(response.data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role); 
        setshowlogin(false);

        if (
          currstate === "Login" &&
          data.email === SUPERADMIN_CREDENTIALS.email &&
          data.password === SUPERADMIN_CREDENTIALS.password
        ) {
          // Hardcoded superadmin logic
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          setshowlogin(false);
          window.location.href = "/admin-dashboard";
          return;
        }

        // Role-based redirection
        if (response.data.role === "admin") {
          window.location.href = "/admin-dashboard";
        } else {
          window.location.href = "/";
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onlogin} className="login-popup-container" action="">
        <div className="login-popup-title">
          <h2>{currstate}</h2>
          <img
            onClick={() => setshowlogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currstate === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onchangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onchangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onchangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
          {currstate === "sign up" && (
            <select
              name="role"
              onChange={onchangeHandler}
              value={data.role}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}
        </div>
        <button type="submit">
          {currstate === "sign up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currstate === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setcurrstate("sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setcurrstate("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;
