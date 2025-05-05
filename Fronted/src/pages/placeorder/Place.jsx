import React, { useEffect, useState } from "react";
import "./place.css";
import { useContext } from "react";
import { Showcontext } from "../../context/Showcontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Place = () => {
  const { getTotalcartamount, token, food_list, cartitem, url } =
    useContext(Showcontext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchanehandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // place order function
  const PlaceOrder = async (event) => {
    event.preventDefault();
    if (!token) {
      alert("User not logged in!");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartitem[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartitem[item._id],
        });
      }
    });

    let orderdata = {
      address: data,
      items: orderItems,
      amount: getTotalcartamount() + 2,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderdata, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        window.location.replace(response.data.session_url);
      } else {
        alert("Order placement failed");
      }
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error);
      alert(error.response?.data?.message || "Internal Server Error");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalcartamount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={PlaceOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onchanehandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            onChange={onchanehandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          name="email"
          onChange={onchanehandler}
          value={data.email}
          type="email"
          placeholder="Email address"
          required
        />
        <input
          name="street"
          onChange={onchanehandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onchanehandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onchanehandler}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipcode"
            onChange={onchanehandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip code"
            required
          />
          <input
            name="country"
            onChange={onchanehandler}
            value={data.country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="phone"
          onChange={onchanehandler}
          value={data.phone}
          type="Number"
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-detail">
              <p>Subtotal</p>
              <p>₹{getTotalcartamount()}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Delivery Fee</p>
              <p>₹{getTotalcartamount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-detail">
              <p>Total</p>
              <p>
                ₹{getTotalcartamount() === 0 ? 0 : getTotalcartamount() + 2}
              </p>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default Place;
