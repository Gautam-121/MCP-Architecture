// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import connectDB from "./db/db.js";
// import { z } from "zod";
// import ProductModel from "./models/product.model.js";
// import dotenv from 'dotenv';
// dotenv.config({path:"./.env"});

// // Create server instance
// const server = new McpServer({
//   name: "e-commerse",
//   version: "1.0.0",
// });

// // 🛒 1️⃣ **Add a Product**
// server.tool(
//   "add-product",
//   "Add a new product to the database",
//   {
//     name: z.string().min(1).describe("Product name"),
//     description: z.string().optional().describe("Product description"),
//     price: z.number().min(0).describe("Product price"),
//     category: z.string().describe("Product category"),
//     stock: z.number().min(0).default(0).describe("Available stock"),
//   },
//   async ({ name, description, price, category, stock }) => {
//     try {
//       const newProduct = new ProductModel({ name, description, price, category, stock });
//       await newProduct.save();
//       return { content: [{ type: "text", text: `✅ Product '${name}' added with ID: ${newProduct._id}` }] };
//     } catch (error) {
//       console.error("Error adding product:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );

// // 🔍 2️⃣ **Get a Product by ID**
// server.tool(
//   "get-product",
//   "Retrieve a product by its ID",
//   {
//     productId: z.string().min(1).describe("Product ID"),
//   },
//   async ({ productId }) => {
//     try {
//       const product = await ProductModel.findById(productId);
//       if (!product) throw new Error("Product not found");
//       return { content: [{ type: "text", text: `✅ Product found: ${JSON.stringify(product)}` }] };
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );

// // ✏️ 3️⃣ **Update a Product**
// server.tool(
//   "update-product",
//   "Update an existing product",
//   {
//     productId: z.string().min(1).describe("Product ID"),
//     name: z.string().optional().describe("Updated name"),
//     description: z.string().optional().describe("Updated description"),
//     price: z.number().min(0).optional().describe("Updated price"),
//     category: z.string().optional().describe("Updated category"),
//     stock: z.number().min(0).optional().describe("Updated stock"),
//   },
//   async ({ productId, ...updates }) => {
//     try {
//       const product = await ProductModel.findByIdAndUpdate(productId, updates, { new: true });
//       if (!product) throw new Error("Product not found");
//       return { content: [{ type: "text", text: `✅ Product updated: ${JSON.stringify(product)}` }] };
//     } catch (error) {
//       console.error("Error updating product:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );

// // ❌ 4️⃣ **Delete a Product**
// server.tool(
//   "delete-product",
//   "Delete a product by its ID",
//   {
//     productId: z.string().min(1).describe("Product ID"),
//   },
//   async ({ productId }) => {
//     try {
//       const product = await ProductModel.findByIdAndDelete(productId);
//       if (!product) throw new Error("Product not found");
//       return { content: [{ type: "text", text: `✅ Product deleted: ${product.name}` }] };
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );

// // 🔎 5️⃣ **Search & Filter Products**
// server.tool(
//   "search-products",
//   "Search products by name, category, or price range",
//   {
//     name: z.string().optional().describe("Product name (partial match)"),
//     category: z.string().optional().describe("Product category"),
//     minPrice: z.number().min(0).optional().describe("Minimum price"),
//     maxPrice: z.number().min(0).optional().describe("Maximum price"),
//     limit: z.number().min(1).default(10).describe("Number of results to return"),
//   },
//   async ({ name, category, minPrice, maxPrice, limit }) => {
//     try {
//       const query: any = {};
//       if (name) query.name = new RegExp(name, "i"); // Case-insensitive search
//       if (category) query.category = category;
//       if (minPrice !== undefined) query.price = { $gte: minPrice };
//       if (maxPrice !== undefined) query.price = { ...query.price, $lte: maxPrice };

//       const products = await ProductModel.find(query).limit(limit);
//       return { content: [{ type: "text", text: `✅ Found ${products.length} products: ${JSON.stringify(products)}` }] };
//     } catch (error) {
//       console.error("Error searching products:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );

// async function main() {
//     await connectDB();
//     const transport = new StdioServerTransport();
//     await server.connect(transport);
//     console.error("Weather MCP Server running on stdio");
// }
  
// main().catch((error) => {
//     console.error("Fatal error in main():", error);
//     process.exit(1);
//   });



// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
// import {StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
// import connectDB from "./db/db.js";
// import { z } from "zod";
// import ProductModel from "./models/product.model.js";
// import dotenv from 'dotenv';
// import express, { Request, Response } from "express";
// dotenv.config({path:"./.env"});


// const server = new McpServer({
//   name: "e-commerse",
//   version: "1.0.0",
// });

// // 🛒 1️⃣ **Add a Product**
// server.tool(
//   "add-product",
//   "Add a new product to the database",
//   {
//     name: z.string().min(1).describe("Product name"),
//     description: z.string().optional().describe("Product description"),
//     price: z.number().min(0).describe("Product price"),
//     category: z.string().describe("Product category"),
//     stock: z.number().min(0).default(0).describe("Available stock"),
//   },
//   async ({ name, description, price, category, stock }) => {
//     try {
//       const newProduct = new ProductModel({ name, description, price, category, stock });
//       await newProduct.save();
//       return { content: [{ type: "text", text: `✅ Product '${name}' added with ID: ${newProduct._id}` }] };
//     } catch (error) {
//       console.error("Error adding product:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );

// // 🔍 2️⃣ **Get a Product by ID**
// server.tool(
//   "get-product",
//   "Retrieve a product by its ID",
//   {
//     productId: z.string().min(1).describe("Product ID"),
//   },
//   async ({ productId }) => {
//     try {
//       const product = await ProductModel.findById(productId);
//       if (!product) throw new Error("Product not found");
//       return { content: [{ type: "text", text: `✅ Product found: ${JSON.stringify(product)}` }] };
//     } catch (error) {
//       console.error("Error fetching product:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );

// // ✏️ 3️⃣ **Update a Product**
// server.tool(
//   "update-product",
//   "Update an existing product",
//   {
//     productId: z.string().min(1).describe("Product ID"),
//     name: z.string().optional().describe("Updated name"),
//     description: z.string().optional().describe("Updated description"),
//     price: z.number().min(0).optional().describe("Updated price"),
//     category: z.string().optional().describe("Updated category"),
//     stock: z.number().min(0).optional().describe("Updated stock"),
//   },
//   async ({ productId, ...updates }) => {
//     try {
//       const product = await ProductModel.findByIdAndUpdate(productId, updates, { new: true });
//       if (!product) throw new Error("Product not found");
//       return { content: [{ type: "text", text: `✅ Product updated: ${JSON.stringify(product)}` }] };
//     } catch (error) {
//       console.error("Error updating product:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );

// // ❌ 4️⃣ **Delete a Product**
// server.tool(
//   "delete-product",
//   "Delete a product by its ID",
//   {
//     productId: z.string().min(1).describe("Product ID"),
//   },
//   async ({ productId }) => {
//     try {
//       const product = await ProductModel.findByIdAndDelete(productId);
//       if (!product) throw new Error("Product not found");
//       return { content: [{ type: "text", text: `✅ Product deleted: ${product.name}` }] };
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );

// // 🔎 5️⃣ **Search & Filter Products**
// server.tool(
//   "search-products",
//   "Search products by name, category, or price range",
//   {
//     name: z.string().optional().describe("Product name (partial match)"),
//     category: z.string().optional().describe("Product category"),
//     minPrice: z.number().min(0).optional().describe("Minimum price"),
//     maxPrice: z.number().min(0).optional().describe("Maximum price"),
//     limit: z.number().min(1).default(10).describe("Number of results to return"),
//   },
//   async ({ name, category, minPrice, maxPrice, limit }) => {
//     try {
//       const query: any = {};
//       if (name) query.name = new RegExp(name, "i"); // Case-insensitive search
//       if (category) query.category = category;
//       if (minPrice !== undefined) query.price = { $gte: minPrice };
//       if (maxPrice !== undefined) query.price = { ...query.price, $lte: maxPrice };

//       const products = await ProductModel.find(query).limit(limit);
//       return { content: [{ type: "text", text: `✅ Found ${products.length} products: ${JSON.stringify(products)}` }] };
//     } catch (error) {
//       console.error("Error searching products:", error);
//       return { content: [{ type: "text", text: `❌ Failed to add product: ${(error as Error).message}` }] };
//     }
//   }
// );


// connectDB()
// .then(async () => {
//   // Start receiving messages on stdin and sending messages on stdout
//     const transport = new StdioServerTransport();
//     await server.connect(transport); 
//   // app.listen(PORT, () => {
//   //   console.log(`Server is running on port ${PORT}`);
//   // });
// })
// .catch((err) => {
//   console.error("Error connecting to database:", err);
// });



// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
// import connectDB from "./db/db.js";
// import { z } from "zod";
// import ProductModel from "./models/product.model.js";
// import dotenv from 'dotenv';
// import express , {Request , Response} from "express"
// import { graphql, buildSchema } from 'graphql'; // For in-memory GraphQL execution

// dotenv.config({ path: "./.env" });

// const server = new McpServer({
//   name: "e-commerce",
//   version: "1.0.0",
// });

// // Define GraphQL Schema
// const schema = buildSchema(`
//   type Product {
//     _id: ID!
//     name: String!
//     description: String
//     price: Float!
//     category: String!
//     stock: Int!
//   }

//   type Response {
//     message: String!
//   }

//   input ProductInput {
//     name: String!
//     description: String
//     price: Float!
//     category: String!
//     stock: Int
//   }

//   type Query {
//     getProductById(id: ID!): Product
//     getAllProducts: [Product!]!
//   }

//   type Mutation {
//     addProduct(input: ProductInput!): Response!
//   }
// `);


// // GraphQL Resolvers
// const root = {
//   addProduct: async ({ input }:any) => {
//     const { name, description, price, category, stock } = input;
//     try {
//       const newProduct = new ProductModel({ name, description, price, category, stock });
//       await newProduct.save();
//       return { message: `✅ Product '${name}' added with ID: ${newProduct._id}` };
//     } catch (error:any) {
//       throw new Error(`Failed to add product: ${error.message}`);
//     }
//   },
//   getProductById: async ({ id }: any) => {
//     try {
//       return await ProductModel.findById(id);
//     } catch (error: any) {
//       throw new Error(`Failed to fetch product: ${error.message}`);
//     }
//   },
//   getAllProducts: async () => {
//     try {
//       return await ProductModel.find();
//     } catch (error: any) {
//       throw new Error(`Failed to fetch products: ${error.message}`);
//     }
//   },
// };

// // MCP Tool with In-Memory GraphQL
// server.tool(
//   "add-product",
//   "Add a new product to the database using GraphQL",
//   {
//     name: z.string().min(1).describe("Product name"),
//     description: z.string().optional().describe("Product description"),
//     price: z.number().min(0).describe("Product price"),
//     category: z.string().describe("Product category"),
//     stock: z.number().min(0).default(0).describe("Available stock"),
//   },
//   async ({ name, description, price, category, stock }) => {
//     try {
//       // Define the GraphQL mutation
//       const mutation = `
//         mutation AddProduct($input: ProductInput!) {
//           addProduct(input: $input) {
//             message
//           }
//         }
//       `;

//       // Variables for the mutation
//       const variables = {
//         input: { name, description, price, category, stock },
//       };

//       // Execute the GraphQL mutation in-memory
//       const response = await graphql({
//         schema,
//         source: mutation,
//         rootValue: root,
//         variableValues: variables,
//       });

//       console.log("response" , response)

//       if (response.errors) {
//         throw new Error(response.errors[0].message);
//       }

//       const data = response.data as { addProduct?: { message?: string } };

//       return {
//         content: [{ type: "text", text: data.addProduct?.message ?? "Unknown response" }],
//       };

//     } catch (error:any) {
//       console.error("Error adding product via GraphQL:", error);
//       return {
//         content: [{ type: "text", text: `❌ Failed to add product: ${error.message}` }],
//       };
//     }
//   }
// );

// server.tool(
//   "get-product-by-id",
//   "Fetch a single product by its ID",
//   {
//     id: z.string().min(1).describe("Product ID"),
//   },
//   async ({ id }) => {
//     try {
//       const query = `
//         query GetProductById($id: ID!) {
//           getProductById(id: $id) {
//             _id
//             name
//             description
//             price
//             category
//             stock
//           }
//         }
//       `;
//       const variables = { id };

//       const response = await graphql({
//         schema,
//         source: query,
//         rootValue: root,
//         variableValues: variables,
//       });

//       if (response.errors) {
//         throw new Error(response.errors[0].message);
//       }

//       return {
//         content: [{ type: "text", text: JSON.stringify(response.data?.getProductById, null, 2) }],
//       };

//     } catch (error: any) {
//       console.error("Error fetching product by ID:", error);
//       return {
//         content: [{ type: "text", text: `❌ Failed to fetch product: ${error.message}` }],
//       };
//     }
//   }
// );

// server.tool(
//   "get-all-products",
//   "Fetch all products",
//   {},
//   async () => {
//     try {
//       const query = `
//         query {
//           getAllProducts {
//             _id
//             name
//             description
//             price
//             category
//             stock
//           }
//         }
//       `;

//       const response = await graphql({
//         schema,
//         source: query,
//         rootValue: root,
//       });

//       if (response.errors) {
//         throw new Error(response.errors[0].message);
//       }

//       return {
//         content: [{ type: "text", text: JSON.stringify(response.data?.getAllProducts, null, 2) }],
//       };

//     } catch (error: any) {
//       console.error("Error fetching all products:", error);
//       return {
//         content: [{ type: "text", text: `❌ Failed to fetch products: ${error.message}` }],
//       };
//     }
//   }
// );



// const app = express();
// let transport: SSEServerTransport | null = null;

// app.get("/sse", async (_: Request, res: Response) => {
//   transport = new SSEServerTransport('/messages', res);
//   await server.connect(transport);
// });

// app.post("/messages", async (req: Request, res: Response) => {
//   if (transport) {
//     await transport.handlePostMessage(req, res);
//   } else {
//     res.status(400).send('No transport found for sessionId');
//   }
// });

// connectDB()
//   .then(() => {
//     const PORT = process.env.PORT || 5000; // Ensure PORT is defined
//     app.listen(PORT, () => {
//       console.log("Server is listening on PORT:", PORT);
//     });
//   })
//   .catch((err) => {
//     console.error("Error connecting to database:", err);
//   });



// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { z } from "zod";
// import dotenv from 'dotenv';
// import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
// import { RESTDataSource } from '@apollo/datasource-rest';
// import { buildSchema } from 'graphql';

// dotenv.config({ path: "./.env" });

// // Base URL for the REST API (set this in your .env file)
// const API_BASE_URL = process.env.API_BASE_URL || 'https://c4d4-106-51-90-72.ngrok-free.app';

// // Define MCP Server
// const mcpServer = new McpServer({
//   name: "e-commerce",
//   version: "1.0.0",
// });

// // Define GraphQL Schema
// const schema = buildSchema(`
//   type Product {
//     _id: ID!
//     name: String!
//     description: String
//     price: Float!
//     category: String!
//     stock: Int!
//   }

//   type Response {
//     message: String!
//   }

//   input ProductInput {
//     name: String!
//     description: String
//     price: Float!
//     category: String!
//     stock: Int
//   }

//   type Query {
//     getProductById(id: ID!): Product
//     getAllProducts: [Product!]!
//   }

//   type Mutation {
//     addProduct(input: ProductInput!): Response!
//   }
// `);

// // REST API Data Source for Apollo Server
// class ProductAPI extends RESTDataSource {
//   constructor() {
//     super();
//     this.baseURL = API_BASE_URL;
//   }

//   async getAllProducts() {
//     return this.get('/products', {
//       cacheOptions: { ttl: 60 }, // Cache for 60 seconds
//     });
//   }

//   async getProductById(id: string) {
//     return this.get(`/products/${id}`, {
//       cacheOptions: { ttl: 60 }, // Cache for 60 seconds
//     });
//   }

//   async addProduct(input: any) {
//     return this.post('/products', input);
//   }
// }

// // Apollo Server Resolvers
// const resolvers = {
//   Query: {
//     getProductById: async (_: any, { id }: { id: string }, { dataSources }: { dataSources: { productAPI: ProductAPI } }) => {
//       return dataSources.productAPI.getProductById(id);
//     },
//     getAllProducts: async (_: any, __: any, { dataSources }: { dataSources: { productAPI: ProductAPI } }) => {
//       return dataSources.productAPI.getAllProducts();
//     },
//   },
//   Mutation: {
//     addProduct: async (_: any, { input }: { input: any }, { dataSources }: { dataSources: { productAPI: ProductAPI } }) => {
//       const product = await dataSources.productAPI.addProduct(input);
//       return { message: `✅ Product '${input.name}' added with ID: ${product._id}` };
//     },
//   },
// };

// // Apollo Server Setup
// const apolloServer = new ApolloServer({
//   typeDefs: schema,
//   resolvers,
// });

// // MCP Tool: Add Product
// mcpServer.tool(
//   "add-product",
//   "Add a new product using GraphQL via Apollo Server",
//   {
//     name: z.string().min(1).describe("Product name"),
//     description: z.string().optional().describe("Product description"),
//     price: z.number().min(0).describe("Product price"),
//     category: z.string().describe("Product category"),
//     stock: z.number().min(0).default(0).describe("Available stock"),
//   },
//   async ({ name, description, price, category, stock }) => {
//     try {
//       const mutation = `
//         mutation AddProduct($input: ProductInput!) {
//           addProduct(input: $input) {
//             message
//           }
//         }
//       `;
//       const variables = {
//         input: { name, description, price, category, stock },
//       };

//       const contextValue = {
//         dataSources: {
//           productAPI: new ProductAPI(),
//         },
//       };

//       const response = await apolloServer.executeOperation({query: mutation, variables },{contextValue});

//       // Handle Apollo Server 4+ response structure
//       if (response.body.kind === "single") {
//         const result = response.body.singleResult;
        
//         if (result.errors?.length) {
//           throw new Error(result.errors[0].message);
//         }

//         const data = result.data as { addProduct?: { message?: string } };
//         return {
//           content: [{
//             type: "text",
//             text: data.addProduct?.message ?? "Product added successfully"
//           }],
//         };
//       }

//       throw new Error("Unexpected response format from Apollo Server");
//     } catch (error: any) {
//       console.error("Error adding product via Apollo Server:", error);
//       return {
//         content: [{ type: "text", text: `❌ Failed to add product: ${error.message}` }],
//       };
//     }
//   }
// );

// // MCP Tool: Get Product by ID
// mcpServer.tool(
//   "get-product-by-id",
//   "Fetch a single product by its ID via Apollo Server",
//   {
//     id: z.string().min(1).describe("Product ID"),
//   },
//   async ({ id }) => {
//     try {
//       const query = `
//         query GetProductById($id: ID!) {
//           getProductById(id: $id) {
//             _id
//             name
//             description
//             price
//             category
//             stock
//           }
//         }
//       `;
//       const variables = { id };

//       const contextValue = {
//         dataSources: {
//           productAPI: new ProductAPI(),
//         },
//       };

//       const response = await apolloServer.executeOperation({query,variables},{contextValue});

//       apolloServer.executeOperation({},{})

//       // Handle Apollo Server 4+ response structure
//       if (response.body.kind === "single") {
//         const result = response.body.singleResult;
        
//         if (result.errors?.length) {
//           throw new Error(result.errors[0].message);
//         }

//         const data = result.data as { getProductById?: any };
//         return {
//           content: [{
//             type: "text",
//             text: JSON.stringify(data.getProductById ?? "Product not found", null, 2)
//           }],
//         };
//       }

//       throw new Error("Unexpected response format from Apollo Server");
//     } catch (error: any) {
//       console.error("Error fetching product by ID:", error);
//       return {
//         content: [{
//           type: "text", 
//           text: `❌ Failed to fetch product: ${error.message}`
//         }],
//       };
//     }
//   }
// );

// // MCP Tool: Get All Products
// mcpServer.tool(
//   "get-all-products",
//   "Fetch all products via Apollo Server",
//   {},
//   async () => {
//     try {
//       const query = `
//         query {
//           getAllProducts {
//             _id
//             name
//             description
//             price
//             category
//             stock
//           }
//         }
//       `;

//       const contextValue = {
//         dataSources: {
//           productAPI: new ProductAPI(),
//         },
//       };

//       const response = await apolloServer.executeOperation({query},{contextValue});

//       // Handle Apollo Server 4+ response structure
//       if (response.body.kind === "single") {
//         const result = response.body.singleResult;
        
//         if (result.errors?.length) {
//           throw new Error(result.errors[0].message);
//         }

//         const data = result.data as { getAllProducts?: any[] };
//         return {
//           content: [{
//             type: "text",
//             text: JSON.stringify(data.getAllProducts ?? "No products found", null, 2)
//           }],
//         };
//       }

//       throw new Error("Unexpected response format from Apollo Server");
//     } catch (error: any) {
//       console.error("Error fetching all products:", error);
//       return {
//         content: [{
//           type: "text", 
//           text: `❌ Failed to fetch products: ${error.message}`
//         }],
//       };
//     }
//   }
// );

// mcpServer.tool(
//   "execute-graphql",
//   `Execute a custom GraphQL query or mutation against the e-commerce server. Available operations:
//     - Mutation: \`addProduct(input: ProductInput!)\` - Adds a product. Returns \`{ message }\`.
//       - Input: \`ProductInput\` requires \`name: String!\`, \`price: Float!\`, \`category: String!\`; optional \`description: String\`, \`stock: Int\`.
//     - Query: \`getProductById(id: ID!)\` - Fetches a product by ID. Returns \`{ _id, name, description, price, category, stock }\`.
//       - Input: \`id: ID!\` (required).
//     - Query: \`getAllProducts\` - Fetches all products. Returns \`[{ _id, name, description, price, category, stock }]\`.
//       - Input: None.
//   Use these operation names and input structures in your GraphQL query string.`,
//   {
//     query: z.string().min(1).describe("The GraphQL query or mutation string to execute"),
//     variables: z.record(z.any()).optional().describe("Variables for the GraphQL operation (optional)"),
//   },
//   async ({ query, variables }) => {
//     try {
//       const contextValue = { dataSources: { productAPI: new ProductAPI() } };
//       const response = await apolloServer.executeOperation(
//         { query, variables: variables || {} },
//         { contextValue }
//       );

//       if (response.body.kind === "single") {
//         const result = response.body.singleResult;
//         if (result.errors?.length) {
//           throw new Error(result.errors.map(e => e.message).join(", "));
//         }
//         const data = result.data;
//         return {
//           content: [{
//             type: "text",
//             text: JSON.stringify(data, null, 2)
//           }],
//         };
//       }
//       throw new Error("Unexpected response format from Apollo Server");
//     } catch (error: any) {
//       console.error("Error executing GraphQL query:", error);
//       return {
//         content: [{ type: "text", text: `❌ GraphQL execution failed: ${error.message}` }],
//       };
//     }
//   }
// );



// // Start Both Servers
// const startServers = async () => {
//   try {
//     // Start MCP Server
//     const transport = new StdioServerTransport();
//     await mcpServer.connect(transport);
//     process.stderr.write("MCP Server running on stdio transport\n"); // Log to stderr;
    
//     // Start Apollo Server with standalone HTTP server
//     const { url } = await startStandaloneServer(apolloServer, {
//       context: async () => ({
//         dataSources: {
//           productAPI: new ProductAPI()
//         },
//       }),
//       listen: {port: 4001}
//     });
//     process.stderr.write(`Apollo Server running at ${url}`);
//   } catch (err) {
//     console.error("Error starting servers:", err);
//   }
// };

// startServers();



// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { z } from "zod";
// import dotenv from 'dotenv';
// import { buildSchema, graphql } from 'graphql';
// import fetch from 'node-fetch'; // For REST API calls
// dotenv.config({ path: "./.env" });

// // Base URL for the REST API (set this in your .env file)
// const API_BASE_URL = process.env.API_BASE_URL || 'https://mcp-api-data-fetch.vercel.app';

// // Define MCP Server
// const mcpServer = new McpServer({
//   name: "e-commerce",
//   version: "1.0.0",
// });

// // Define GraphQL Schema
// const schema = buildSchema(`
//   type Product {
//     _id: ID!
//     name: String!
//     description: String
//     price: Float!
//     category: String!
//     stock: Int!
//   }

//   type Response {
//     message: String!
//   }

//   input ProductInput {
//     name: String!
//     description: String
//     price: Float!
//     category: String!
//     stock: Int
//   }

//   type Query {
//     getProductById(id: ID!): Product
//     getAllProducts: [Product!]!
//   }

//   type Mutation {
//     addProduct(input: ProductInput!): Response!
//   }
// `);

// // REST API Data Source (similar to ProductAPI)
// class ProductAPI {
//   async getAllProducts() {
//     const response = await fetch(`${API_BASE_URL}/products`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return response.json();
//   }

//   async getProductById(id:any) {
//     const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return response.json();
//   }

//   async addProduct(input:any) {
//     const response = await fetch(`${API_BASE_URL}/products`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(input),
//     });
//     return response.json();
//   }
// }


// // GraphQL Resolvers
// const rootValue = {
//   getProductById: async ({ id }:any) => {
//     const productAPI = new ProductAPI();
//     return productAPI.getProductById(id);
//   },
//   getAllProducts: async () => {
//     const productAPI = new ProductAPI();
//     return productAPI.getAllProducts();
//   },
//   addProduct: async ({ input }:any) => {
//     const productAPI = new ProductAPI();
//     const product = await productAPI.addProduct(input);
//     return { message: `✅ Product '${input.name}' added with ID: ${product._id}` };
//   },
// };


// mcpServer.tool(
//   "execute-graphql",
//   `Execute a custom GraphQL query or mutation against the e-commerce server. Available operations:
//     - Mutation: \`addProduct(input: ProductInput!)\` - Adds a product. Returns \`{ message }\`.
//       - Input: \`ProductInput\` requires \`name: String!\`, \`price: Float!\`, \`category: String!\`; optional \`description: String\`, \`stock: Int\`.
//     - Query: \`getProductById(id: ID!)\` - Fetches a product by ID. Returns \`{ _id, name, description, price, category, stock }\`.
//       - Input: \`id: ID!\` (required).
//     - Query: \`getAllProducts\` - Fetches all products. Returns \`[{ _id, name, description, price, category, stock }]\`.
//       - Input: None.
//   Use these operation names and input structures in your GraphQL query string.`,
//   {
//     query: z.string().min(1).describe("The GraphQL query or mutation string to execute"),
//     variables: z.record(z.any()).optional().describe("Variables for the GraphQL operation (optional)"),
//   },
//   async ({ query, variables }) => {
//     try {
//       const response = await graphql({
//         schema,
//         source: query,
//         rootValue,
//         variableValues: variables || {},
//       });

//       if (response.errors?.length) {
//         throw new Error(response.errors.map(e => e.message).join(", "));
//       }

//       const data = response.data;
//       return {
//         content: [{
//           type: "text",
//           text: JSON.stringify(data, null, 2)
//         }],
//       };
//     } catch (error: any) {
//       console.error("Error executing GraphQL query:", error);
//       return {
//         content: [{ type: "text", text: `❌ GraphQL execution failed: ${error.message}` }],
//       };
//     }
//   }
// );



// // Start MCP Server
// const startServer = async () => {
//   try {
//     const transport = new StdioServerTransport();
//     await mcpServer.connect(transport);
//     process.stderr.write("MCP Server running on stdio transport\n");

//     // Keep process alive for stdin requests
//     process.stdin.on("data", (data) => {
//       const input = data.toString().trim();
//       process.stderr.write(`Received input: ${input}\n`);
//       try {
//         const request = JSON.parse(input);
//         if (!request.jsonrpc || !request.method) {
//           process.stderr.write("Invalid JSON-RPC request received.\n");
//         }
//       } catch (err:any) {
//         process.stderr.write(`Error parsing input: ${err.message}\n`);
//       }
//     });

//     process.stdin.resume();
//     process.stderr.write("Server started and waiting for MCP client requests.\n");
//   } catch (err) {
//     console.error("Error starting server:", err);
//     process.exit(1);
//   }
// };

// startServer();




import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import connectDB from "./db/db.js";
import { z } from "zod";
import { buildSchema, graphql } from 'graphql';
import express, { Request, Response } from "express";
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL

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



const app = express();
let transport: SSEServerTransport | null = null;

app.get("/sse", async (_: Request, res: Response) => {
  transport = new SSEServerTransport('/messages', res);
  await mcpServer.connect(transport);
});

app.post("/messages", async (req: Request, res: Response) => {
  if (transport) {
    console.log("Enter inside message")
    await transport.handlePostMessage(req, res);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from E-commerce API");
})

connectDB()
  .then(() => {
    const PORT = process.env.PORT
    app.listen(PORT, () => {
      console.log("Server is listening on PORT:", PORT)
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err);
  });


// import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import { z } from "zod";
// import dotenv from 'dotenv';
// import { buildSchema, graphql } from 'graphql';
// import fetch from 'node-fetch'; // For REST API calls
// dotenv.config({ path: "./.env" });

// // Base URL for the REST API (set this in your .env file)
// const API_BASE_URL = 'https://mcp-api-data-fetch.vercel.app';

// // Define MCP Server
// const mcpServer = new McpServer({
//   name: "e-commerce",
//   version: "1.0.0",
// });

// // Define GraphQL Schema
// const schema = buildSchema(`
//   type Product {
//     _id: ID!
//     name: String!
//     description: String
//     price: Float!
//     category: String!
//     stock: Int!
//   }

//   type Response {
//     message: String!
//   }

//   input ProductInput {
//     name: String!
//     description: String
//     price: Float!
//     category: String!
//     stock: Int
//   }

//   type Query {
//     getProductById(id: ID!): Product
//     getAllProducts: [Product!]!
//   }

//   type Mutation {
//     addProduct(input: ProductInput!): Response!
//   }
// `);

// // REST API Data Source (similar to ProductAPI)
// class ProductAPI {
//   async getAllProducts() {
//     const response = await fetch(`${API_BASE_URL}/products`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return response.json();
//   }

//   async getProductById(id:any) {
//     const response = await fetch(`${API_BASE_URL}/products/${id}`, {
//       method: 'GET',
//       headers: { 'Content-Type': 'application/json' },
//     });
//     return response.json();
//   }

//   async addProduct(input:any) {
//     const response = await fetch(`${API_BASE_URL}/products`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(input),
//     });
//     return response.json();
//   }
// }


// // GraphQL Resolvers
// const rootValue = {
//   getProductById: async ({ id }:any) => {
//     const productAPI = new ProductAPI();
//     return productAPI.getProductById(id);
//   },
//   getAllProducts: async () => {
//     const productAPI = new ProductAPI();
//     return productAPI.getAllProducts();
//   },
//   addProduct: async ({ input }:any) => {
//     const productAPI = new ProductAPI();
//     const product = await productAPI.addProduct(input);
//     return { message: `✅ Product '${input.name}' added with ID: ${product._id}` };
//   },
// };


// mcpServer.tool(
//   "execute-graphql",
//   `Execute a custom GraphQL query or mutation against the e-commerce server. Available operations:
//     - Mutation: \`addProduct(input: ProductInput!)\` - Adds a product. Returns \`{ message }\`.
//       - Input: \`ProductInput\` requires \`name: String!\`, \`price: Float!\`, \`category: String!\`; optional \`description: String\`, \`stock: Int\`.
//     - Query: \`getProductById(id: ID!)\` - Fetches a product by ID. Returns \`{ _id, name, description, price, category, stock }\`.
//       - Input: \`id: ID!\` (required).
//     - Query: \`getAllProducts\` - Fetches all products. Returns \`[{ _id, name, description, price, category, stock }]\`.
//       - Input: None.
//   Use these operation names and input structures in your GraphQL query string.`,
//   {
//     query: z.string().min(1).describe("The GraphQL query or mutation string to execute"),
//     variables: z.record(z.any()).optional().describe("Variables for the GraphQL operation (optional)"),
//   },
//   async ({ query, variables }) => {
//     try {
//       const response = await graphql({
//         schema,
//         source: query,
//         rootValue,
//         variableValues: variables || {},
//       });

//       if (response.errors?.length) {
//         throw new Error(response.errors.map(e => e.message).join(", "));
//       }

//       const data = response.data;
//       return {
//         content: [{
//           type: "text",
//           text: JSON.stringify(data, null, 2)
//         }],
//       };
//     } catch (error: any) {
//       console.error("Error executing GraphQL query:", error);
//       return {
//         content: [{ type: "text", text: `❌ GraphQL execution failed: ${error.message}` }],
//       };
//     }
//   }
// );



// // Start MCP Server
// const startServer = async () => {
//   try {
//     const transport = new StdioServerTransport();
//     await mcpServer.connect(transport);
//     process.stderr.write("MCP Server running on stdio transport\n");

//     // Keep process alive for stdin requests
//     process.stdin.on("data", (data) => {
//       const input = data.toString().trim();
//       process.stderr.write(`Received input: ${input}\n`);
//       try {
//         const request = JSON.parse(input);
//         if (!request.jsonrpc || !request.method) {
//           process.stderr.write("Invalid JSON-RPC request received.\n");
//         }
//       } catch (err:any) {
//         process.stderr.write(`Error parsing input: ${err.message}\n`);
//       }
//     });

//     process.stdin.resume();
//     process.stderr.write("Server started and waiting for MCP client requests.\n");
//   } catch (err) {
//     console.error("Error starting server:", err);
//     process.exit(1);
//   }
// };

// startServer();
  