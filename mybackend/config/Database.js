import mongoose from "mongoose";

export const connectDB = async()=>{
   const {connection} = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/Learnify")

   console.log(`Mongodb is connected with ${connection.host}`)
}