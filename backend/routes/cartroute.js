import express from 'express'
import { addToCart ,removecart,getCart} from '../controllers/cartcontroller.js'
import authmidddleware from '../middleware/auth.js';
const CartRouter=express.Router();
CartRouter.post("/add",authmidddleware,addToCart)
CartRouter.post("/remove",authmidddleware,removecart)
CartRouter.get("/get",authmidddleware,getCart)

export default CartRouter;