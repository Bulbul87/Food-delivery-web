import mongoose from "mongoose";

const orderSchema=new  mongoose.Schema({
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment :{type:Boolean,default:false}
})

const ordermodel=mongoose.model.order||mongoose.model("order",orderSchema)
export default ordermodel;
