import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV || "development";

    // Pick the correct URI
    let mongoURI = process.env.MONGO_URI;

    if (env === "test") {
      mongoURI = process.env.MONGO_URI_TEST;
    } else if (env === "prod" || env === "production") {
      mongoURI = process.env.MONGO_URI;
    }

    if (!mongoURI) {
      throw new Error(`MongoDB URI not found for environment: ${env}`);
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Connected to MongoDB (${env} mode)`);
  } catch (error) {                 
    console.log("❌ MongoDB connection error:", error.message);
  }
};

export default connectDB;
