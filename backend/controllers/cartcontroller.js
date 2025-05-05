import usermodel from "../models/usermodel.js";

const addToCart = async (req, resp) => {
  try {
    const userId = req.user.id;
    const itemId = req.body.itemId;

    if (!itemId) {
      return resp.status(400).json({ success: false, message: "Item ID is required" });
    }

    const user = await usermodel.findById(userId);
    if (!user) {
      return resp.status(404).json({ success: false, message: "User not found" });
    }
    
   const cartData = Object.fromEntries(user.cartData || []);
    cartData[itemId] = (cartData[itemId] || 0) + 1;
    user.cartData = new Map(Object.entries(cartData));
    await user.save();

    resp.json({ success: true, message: "Added to cart", cartData });
  } catch (error) {
    console.error("Error in addToCart:", error);
    resp.status(500).json({ success: false, message: "Error adding to cart" });
  }
};
const removecart = async (req, resp) => {
  try {
    const userId = req.user.id;
    const itemId = req.body.itemId;

    if (!userId || !itemId) {
      return resp.status(400).json({ success: false, message: "Missing userId or itemId" });
    }

    const user = await usermodel.findById(userId);
    if (!user) {
      return resp.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = Object.fromEntries(user.cartData || []);

    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }

      user.cartData = new Map(Object.entries(cartData));
      await user.save();

      resp.json({ success: true, message: "Removed from cart", cartData });
    } else {
      resp.status(400).json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error in removecart:", error);
    resp.status(500).json({ success: false, message: "Error removing from cart" });
  }
};
const getCart = async (req, resp) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return resp.status(400).json({ success: false, message: "User ID is required" });
    }

    const user = await usermodel.findById(userId);
    if (!user) {
      return resp.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = Object.fromEntries(user.cartData || []);
    resp.json({ success: true, cartData });
  } catch (error) {
    console.error("Error in getCart:", error);
    resp.status(500).json({ success: false, message: "Error fetching cart data" });
  }
};


  
export { addToCart, removecart, getCart }
