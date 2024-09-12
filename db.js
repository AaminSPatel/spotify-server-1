import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//console.log(process.env.MONGO_URL);

const MONGOURL = process.env.MONGO_URL;

//console.log(MONGOURL);

const connectDB = async () => {
  try {
    await mongoose.connect(MONGOURL);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;