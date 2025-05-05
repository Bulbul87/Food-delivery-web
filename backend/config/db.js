import mongoose from 'mongoose';
 export const connectdb=async ()=>{
    await mongoose.connect('mongodb+srv://greatstack:24681012@cluster0.ilsd1.mongodb.net/delivery_project').then(()=>console.log("db connected"))
}