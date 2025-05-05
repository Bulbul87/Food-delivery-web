
import React, { useContext, useEffect } from "react";
import {Showcontext } from "../../context/Showcontext"; 
import "./verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

function Verify() {
  const [searchParams] = useSearchParams(); 
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(Showcontext); 
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      navigate("/"); 
    }
  };

  useEffect(() => {
    if (success && orderId) {
      verifyPayment();
    } else {
      console.warn("Missing success or orderId query parameters");
      navigate("/"); 
    }
  }, [success, orderId, url, navigate]);

  return <div>Verifying your payment...</div>; 
}

export default Verify;
