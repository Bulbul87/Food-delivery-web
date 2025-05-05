import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// user place the order
const placeorder = async (req, resp) => {
  const frontend_url = "http://localhost:5173";
  try {
    const { items, amount, address } = req.body;
    const userId = req.user.id;

    if (!userId || !items || !amount || !address) {
      return resp
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const neworder = new ordermodel({ userId, items, amount, address });
    await neworder.save();
    await usermodel.findByIdAndUpdate(userId, { cartdata: {} });

    const line_item = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: { name: item.name },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    line_item.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery charges" },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_item,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${neworder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${neworder._id}`,
    });

    resp.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    resp.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
// verify order api
const verifyorder = async (req, resp) => {
  const { orderId, success } = req.body;

  try {

    if (success == "true") {
      await ordermodel.findByIdAndUpdate(orderId, { payment: true })
      resp.json({ success: "true", message: "paid " })


    }
    else {
      await ordermodel.findByIdAndDelete(orderId);
      resp.json({ success: false, message: "Not paid" });

    }
  } catch (error) {
    console.log(error);
    resp.json({ success: false, message: "Error" })
  }
}

//users order
const userorder = async (req, resp) => {
  try {
    const orders = await ordermodel.find({ userId: req.user.id });
    resp.json({ success: true, data: orders })
  } catch (error) {
    console.log(error)
    resp.json({ success: false, message: "Error" })
  }
}
// listing order for admin panel
const listorder = async (req, resp) => {
  try {
    const orders = await ordermodel.find({});
    resp.json({ success: true, data: orders })
  } catch (error) {
    console.log({ success: false, message: "Error" })
  }
}
// api for updating order status
const updatestatus = async (req, resp) => {
  try {
    await ordermodel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    resp.json({ success: true, message: "Status Updated" })

  } catch (error) {
    console.log(error);
    resp.json({ success: false, message: "Error" })
  }
}


export { placeorder, verifyorder, userorder, listorder, updatestatus }
