import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import validator from "validator"
export const loginuser = async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await usermodel.findOne({ email });

    if (!user) {
      return resp.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resp.json({ success: false, message: "Invalid credentials" });
    }

    const token = createtoken(user._id, user.role);
    resp.json({ success: true, token, role: user.role });
  } catch (error) {
    console.log(error);
    resp.json({ success: false, message: "Error occurred during login" });
  }
};
// token create
const createtoken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registeruser = async (req, resp) => {
  const { name, password, email, role } = req.body;
  try {
    const exists = await usermodel.findOne({ email });
    if (exists) {
      return resp.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return resp.json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return resp.json({ success: false, message: "Please enter a strong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const newuser = new usermodel({
      name,
      email,
      password: hashedpassword,
      role: role || "user",
    });

    const user = await newuser.save();
    const token = createtoken(user._id, user.role);
    resp.json({ success: true, token, role: user.role });
  } catch (error) {
    console.log(error);
    resp.json({ success: false, message: "Error occurred during registration" });
  }
};


