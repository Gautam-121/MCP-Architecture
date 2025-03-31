import { buildSchema, GraphQLSchema } from "graphql";

export const eCommerceSchema: GraphQLSchema = buildSchema(`
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