import { McpServerBase } from "./server/McpServer.js";
import { eCommerceSchema } from "./graphql/schema.js";
import { eCommerceRootValue } from "./graphql/resolvers.js";
import { eCommerceTool } from "./graphql/tools.js";

const server = new McpServerBase({
  schema: eCommerceSchema,
  rootValue: eCommerceRootValue,
  ...eCommerceTool,
  serverName: "e-commerce",
  serverVersion: "1.0.0",
});

export const app = server.getApp();
export const mcpServer = server.getMcpServer();