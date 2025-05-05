import React  from 'react'
import'./fooditem.css'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { Showcontext } from '../../context/Showcontext'

const Fooditem = ({ id, name, price, description, image }) => {
    const { cartitem, addtocart, removecart, url } = useContext(Showcontext);
  
    const quantity = cartitem[id] || 0; // Default to 0 if not present
    return (
      <div className="food-item">
        <div className="food-item-img-container">
          <img className="food-item-img" src={`${url}/images/${image}`} alt="" />
          {quantity === 0 ? (
            <img
              className="add"
              onClick={() => addtocart(id)}
              src={assets.add_icon_white}
              alt="Add"
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removecart(id)}
                src={assets.remove}
                alt="Remove"
              />
              <p>{quantity}</p>
              <img
                onClick={() => addtocart(id)}
                src={assets.add_icon_green}
                alt="Add"
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="Rating" />
          </div>
          <p className="food-item-desc">{description}</p>
          <p className="food-item-price">₹{price}</p>
        </div>
      </div>
    );
  };
  

 export default Fooditem