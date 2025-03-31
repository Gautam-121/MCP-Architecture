import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from 'dotenv';
import { buildSchema, graphql } from 'graphql';
import fetch from 'node-fetch'; // For REST API calls
dotenv.config({ path: "./.env" });

// Base URL for the REST API (set this in your .env file)
const API_BASE_URL = 'https://mcp-api-data-fetch.vercel.app';

// Define MCP Server
const mcpServer = new McpServer({
  name: "e-commerce",
  version: "1.0.0",
});

// Define GraphQL Schema
const schema = buildSchema(`
  type Product {
    _id: ID!
    name: String!
    description: String
    price: Float!
    category: String!
    stock: Int!
  }

  type Response {
    message: String!
  }

  input ProductInput {
    name: String!
    description: String
    price: Float!
    category: String!
    stock: Int
  }

  type Query {
    getProductById(id: ID!): Product
    getAllProducts: [Product!]!
  }

  type Mutation {
    addProduct(input: ProductInput!): Response!
  }
`);

// REST API Data Source (similar to ProductAPI)
class ProductAPI {
  async getAllProducts() {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }

  async getProductById(id:any) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }

  async addProduct(input:any) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    return response.json();
  }
}


// GraphQL Resolvers
const rootValue = {
  getProductById: async ({ id }:any) => {
    const productAPI = new ProductAPI();
    return productAPI.getProductById(id);
  },
  getAllProducts: async () => {
    const productAPI = new ProductAPI();
    return productAPI.getAllProducts();
  },
  addProduct: async ({ input }:any) => {
    const productAPI = new ProductAPI();
    const product = await productAPI.addProduct(input);
    return { message: `✅ Product '${input.name}' added with ID: ${product._id}` };
  },
};


mcpServer.tool(
  "execute-graphql",
  `Execute a custom GraphQL query or mutation against the e-commerce server. Available operations:
    - Mutation: \`addProduct(input: ProductInput!)\` - Adds a product. Returns \`{ message }\`.
      - Input: \`ProductInput\` requires \`name: String!\`, \`price: Float!\`, \`category: String!\`; optional \`description: String\`, \`stock: Int\`.
    - Query: \`getProductById(id: ID!)\` - Fetches a product by ID. Returns \`{ _id, name, description, price, category, stock }\`.
      - Input: \`id: ID!\` (required).
    - Query: \`getAllProducts\` - Fetches all products. Returns \`[{ _id, name, description, price, category, stock }]\`.
      - Input: None.
  Use these operation names and input structures in your GraphQL query string.`,
  {
    query: z.string().min(1).describe("The GraphQL query or mutation string to execute"),
    variables: z.record(z.any()).optional().describe("Variables for the GraphQL operation (optional)"),
  },
  async ({ query, variables }) => {
    try {
      const response = await graphql({
        schema,
        source: query,
        rootValue,
        variableValues: variables || {},
      });

      if (response.errors?.length) {
        throw new Error(response.errors.map(e => e.message).join(", "));
      }

      const data = response.data;
      return {
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }],
      };
    } catch (error: any) {
      console.error("Error executing GraphQL query:", error);
      return {
        content: [{ type: "text", text: `❌ GraphQL execution failed: ${error.message}` }],
      };
    }
  }
);



// Start MCP Server
const startServer = async () => {
  try {
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);
    process.stderr.write("MCP Server running on stdio transport\n");

    // Keep process alive for stdin requests
    process.stdin.on("data", (data) => {
      const input = data.toString().trim();
      process.stderr.write(`Received input: ${input}\n`);
      try {
        const request = JSON.parse(input);
        if (!request.jsonrpc || !request.method) {
          process.stderr.write("Invalid JSON-RPC request received.\n");
        }
      } catch (err:any) {
        process.stderr.write(`Error parsing input: ${err.message}\n`);
      }
    });

    process.stdin.resume();
    process.stderr.write("Server started and waiting for MCP client requests.\n");
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

startServer();
  