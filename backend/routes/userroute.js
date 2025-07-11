
import express from "express";
import { loginuser, registeruser } from '../controllers/usercontroller.js';

const userRouter = express.Router();
userRouter.post("/register", registeruser);
userRouter.post("/login", loginuser);

export default userRouter;
