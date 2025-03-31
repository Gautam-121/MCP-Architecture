import { z } from "zod";

export const eCommerceTool = {
  toolName: "execute-graphql",
  toolDescription: `
    Execute a custom GraphQL query or mutation against the e-commerce server. Available operations:
      - Mutation: "addProduct(input: ProductInput!)" - Adds a product. Returns { message }.
        - Input: "ProductInput" requires "name: String!", "price: Float!", "category: String!"; optional "description: String", "stock: Int".
      - Query: "getProductById(id: ID!)" - Fetches a product by ID. Returns { _id, name, description, price, category, stock }.
        - Input: "id: ID!" (required).
      - Query: "getAllProducts" - Fetches all products. Returns [{ _id, name, description, price, category, stock }].
        - Input: None.
    Use these operation names and input structures in your GraphQL query string.
  `,
  toolSchema: {
    query: z.string().min(1).describe("The GraphQL query or mutation string to execute"),
    variables: z.record(z.any()).optional().describe("Variables for the GraphQL operation (optional)"),
  },
};