import mongoose from "mongoose";
const connectDB = async function () {
  try {
    await mongoose.connect("mongodb://localhost:27017/revisionforsaraha");
    console.log("successfully connect with mongoose");
  } catch (error) {
    console.log(" failed to connect with mongoose", error);
  }
};
export default connectDB;
