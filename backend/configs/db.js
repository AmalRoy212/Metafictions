import mongoose from "mongoose";

const connectDB = async function(){
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected ${conn.connection.host }`);
  } catch (error) {
    console.log(`Erorr ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;