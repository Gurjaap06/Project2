import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI missing in .env");
  await mongoose.connect(uri, { dbName: "project2" });
  console.log("✅ MongoDB connected");
}
