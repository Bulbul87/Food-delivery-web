import express from 'express'
import authmidddleware from '../middleware/auth.js'
import { placeorder, userorder, verifyorder,listorder ,updatestatus} from '../controllers/ordercontroller.js'

const orderRouter=express.Router();
orderRouter.post("/place",authmidddleware,placeorder);
orderRouter.post("/verify",verifyorder);
orderRouter.post("/userorder",authmidddleware,userorder);
orderRouter.get("/list",authmidddleware,listorder)
orderRouter.post("/status",authmidddleware,updatestatus)

export default orderRouter;