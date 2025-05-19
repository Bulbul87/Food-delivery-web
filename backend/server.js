import express from "express"
import cors from "cors"
import { connectdb } from "./config/db.js"
import foodRouter from "./routes/foodroute.js"
import userRouter from "./routes/userroute.js"
import 'dotenv/config'
import CartRouter from "./routes/cartroute.js"
import orderRouter from "./routes/orderroute.js"

//app config 
const app = express()
const port = process.env.PORT||4000;

//middleware
app.use(express.json())
app.use(cors())

//db connection
connectdb();

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart",CartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, resp) => {
    resp.send("Api working")
})
app.listen(port, () => {
    console.log(`Server running on https://localhost:${port}`)
})

