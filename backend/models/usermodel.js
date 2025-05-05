import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" }, // Ensure only these roles are allowed
    cartData: {
        type: Map,
        of: Number, // Keys are strings, values are numbers
        default: () => new Map(),
      },
      
}, { minimize: false });

const usermodel = mongoose.models.user || mongoose.model("user", userschema);
export default usermodel;
