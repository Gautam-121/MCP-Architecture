import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path:"./.env"});

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Jyoti273-db:djukOqR9QbI5Itvc@cluster0.nzuylps.mongodb.net/test" as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
