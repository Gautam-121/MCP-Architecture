import fetch from "node-fetch";
import { API_BASE_URL } from "../config/env.js";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
}

interface ProductInput {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock?: number;
}

export class ProductAPI {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json() as Promise<Product[]>;
  }

  async getProductById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response.json() as Promise<Product>;
  }

  async addProduct(input: ProductInput): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    return response.json() as Promise<Product>;
  }
}