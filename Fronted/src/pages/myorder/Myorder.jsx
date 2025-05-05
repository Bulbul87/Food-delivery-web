import React, { useContext, useEffect, useState } from "react";
import "./myorder.css";
import { Showcontext } from "../../context/Showcontext";
import axios from "axios";
import { assets } from "../../assets/assets";
function Myorder() {
  const { url, token } = useContext(Showcontext);
  const [data, setdata] = useState([]);
  const fetchorders = async (req, resp) => {
    const response = await axios.post(
      url + "/api/order/userorder",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setdata(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchorders();
    }
  }, [token]);
  return (
    <div className="my-orders ">
      <h2  >My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x  " + item.quantity;
                  } else {
                    return item.name + " x  " + item.quantity + ",";
                  }
                })}
              </p>
              <p>₹{order.amount}.00</p>
              <p>Items:{order.items.length}</p>
              <p>
                <span>&#x25cf;</span>
                <b>{order.status}</b>
              </p>
              <button onClick={fetchorders}>Track Order</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Myorder;
