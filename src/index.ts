import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import connectDB from "./db/db.js";
import { z } from "zod";
import ProductModel from "./models/product.model.js";
import dotenv from 'dotenv';
dotenv.config({path:"./.env"});

// Create server instance
const server = new McpServer({
  name: "e-commerse",
  version: "1.0.0",
});

// 🛒 1️⃣ **Add a Product**
server.tool(
  "add-product",
  "Add a new product to the database",
  {
    name: z.string().min(1).describe("Product name"),
    description: z.string().optional().describe("Product description"),
    price: z.number().min(0).describe("Product price"),
    category: z.string().describe("Product category"),
    stock: z.number().min(0).default(0).describe("Available stock"),
  },
  async ({ name, description, price, category, stock }) => {
    try {
      const newProduct = new ProductModel({ name, description, price, category, stock });
      await newProduct.save();
      return { content: [{ type: "text", text: `✅ Product '${name}' added with ID: ${newProduct._id}` }] };
    } catch (error) {
      console.error("Error adding product:", error);
      return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
    }
  }
);

// 🔍 2️⃣ **Get a Product by ID**
server.tool(
  "get-product",
  "Retrieve a product by its ID",
  {
    productId: z.string().min(1).describe("Product ID"),
  },
  async ({ productId }) => {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) throw new Error("Product not found");
      return { content: [{ type: "text", text: `✅ Product found: ${JSON.stringify(product)}` }] };
    } catch (error) {
      console.error("Error fetching product:", error);
      return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
    }
  }
);

// ✏️ 3️⃣ **Update a Product**
server.tool(
  "update-product",
  "Update an existing product",
  {
    productId: z.string().min(1).describe("Product ID"),
    name: z.string().optional().describe("Updated name"),
    description: z.string().optional().describe("Updated description"),
    price: z.number().min(0).optional().describe("Updated price"),
    category: z.string().optional().describe("Updated category"),
    stock: z.number().min(0).optional().describe("Updated stock"),
  },
  async ({ productId, ...updates }) => {
    try {
      const product = await ProductModel.findByIdAndUpdate(productId, updates, { new: true });
      if (!product) throw new Error("Product not found");
      return { content: [{ type: "text", text: `✅ Product updated: ${JSON.stringify(product)}` }] };
    } catch (error) {
      console.error("Error updating product:", error);
      return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
    }
  }
);

// ❌ 4️⃣ **Delete a Product**
server.tool(
  "delete-product",
  "Delete a product by its ID",
  {
    productId: z.string().min(1).describe("Product ID"),
  },
  async ({ productId }) => {
    try {
      const product = await ProductModel.findByIdAndDelete(productId);
      if (!product) throw new Error("Product not found");
      return { content: [{ type: "text", text: `✅ Product deleted: ${product.name}` }] };
    } catch (error) {
      console.error("Error deleting product:", error);
      return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
    }
  }
);

// 🔎 5️⃣ **Search & Filter Products**
server.tool(
  "search-products",
  "Search products by name, category, or price range",
  {
    name: z.string().optional().describe("Product name (partial match)"),
    category: z.string().optional().describe("Product category"),
    minPrice: z.number().min(0).optional().describe("Minimum price"),
    maxPrice: z.number().min(0).optional().describe("Maximum price"),
    limit: z.number().min(1).default(10).describe("Number of results to return"),
  },
  async ({ name, category, minPrice, maxPrice, limit }) => {
    try {
      const query: any = {};
      if (name) query.name = new RegExp(name, "i"); // Case-insensitive search
      if (category) query.category = category;
      if (minPrice !== undefined) query.price = { $gte: minPrice };
      if (maxPrice !== undefined) query.price = { ...query.price, $lte: maxPrice };

      const products = await ProductModel.find(query).limit(limit);
      return { content: [{ type: "text", text: `✅ Found ${products.length} products: ${JSON.stringify(products)}` }] };
    } catch (error) {
      console.error("Error searching products:", error);
      return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
    }
  }
);

async function main() {
    await connectDB();
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Weather MCP Server running on stdio");
}
  
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });