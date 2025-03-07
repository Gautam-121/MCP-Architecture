import mongoose, { Schema, Document } from "mongoose";

// Define the Product interface extending Document
export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Create the Product schema
const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    images: { type: [String], default: [] },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Create the Product model
const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
