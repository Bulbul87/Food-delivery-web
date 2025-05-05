import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Showcontext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartitem, setcartitem] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [food_list, setfoodlist] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const url = "http://localhost:4000";

  // add cart
  const addtocart = async (itemId) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data?.cartData) {
        setcartitem((prevCart) => ({ ...prevCart, ...response.data.cartData }));
      } else {
        console.warn("Cart data not found in response.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  //remove cart
  const removecart = async (itemId) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data?.cartData) {
        setcartitem(response.data.cartData);
      } else {
        console.warn("Cart data not found in response.");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  // Calculate Total Cart Amount
  const getTotalcartamount = () => {
    let totalamount = 0;
    for (const itemId in cartitem) {
      if (cartitem[itemId] > 0) {
        const iteminfo = food_list.find((product) => product._id === itemId);
        if (iteminfo) totalamount += iteminfo.price * cartitem[itemId];
      }
    }
    return totalamount;
  };

  // Fetch Food List
  const fetchfoodlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setfoodlist(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Load Cart Data
  const loadCartData = async (token) => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response?.data?.cartData) {
        setcartitem(response.data.cartData);
      } else {
        console.warn("No cart data found, using localStorage.");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  // Update Role
  const updateRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
  };
  // Update Token
  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };
  // Load Data on Mount
  useEffect(() => {
    async function loaddata() {
      setIsLoading(true);
      await fetchfoodlist();
      if (token) {
        await loadCartData(token);
      }
      setIsLoading(false);
    }
    loaddata();
  }, [token]);

  const contextvalue = {
    food_list,
    cartitem,
    addtocart,
    removecart,
    getTotalcartamount,
    url,
    token,
    setToken: updateToken,
    role,
    setRole: updateRole,
  };
  return (
    <Showcontext.Provider value={contextvalue}>
      {props.children}
    </Showcontext.Provider>
  );
};

export default StoreContextProvider;
