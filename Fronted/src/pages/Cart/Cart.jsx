import React, { useContext } from "react";
import "./cart.css";
import { Showcontext } from "../../context/Showcontext";
import { useNavigate } from "react-router-dom";
 


const Cart = () => {
  const { cartitem, food_list, removecart, getTotalcartamount, url  } = useContext(Showcontext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-item">
        <div className="cart-item-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          const quantity = cartitem?.[item._id] || 0;
          if (quantity > 0) {
            return (
              <div key={item._id}>
                <div className="cart-item-title cart-items-item">
                  <img src={`${url}/images/${item.image}`} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{quantity}</p>
                  <p>₹{item.price * quantity}</p>
                  <p onClick={() => removecart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
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
              <p>₹{getTotalcartamount() === 0 ? 0 : getTotalcartamount() + 2}</p>
            </div>
          </div>
          <button onClick={() => navigate("/place")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promocode" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
