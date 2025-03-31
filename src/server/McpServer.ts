import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express, { Request, Response } from "express";
import { graphql, GraphQLSchema } from "graphql";
import { z } from "zod";
import connectDB from "../db/db.js";
import { PORT } from "../config/env.js";

// Custom Maybe type to mimic graphql's internal Maybe<T>
type Maybe<T> = T | null | undefined;

// Define the expected args type for the tool handler, aligned with MCP SDK
interface ToolArgs {
  query: string;
  variables?: unknown; // Match the SDK's expectation
}

// Define the return type for the tool handler, aligned with MCP SDK
interface ToolResponse {
  content: Array<
    | { type: "text"; text: string; [key: string]: unknown }
    | { type: "image"; data: string; mimeType: string; [key: string]: unknown }
  >;
  _meta?: Record<string, unknown>;
  isError?: boolean;
  [key: string]: unknown;
}

interface McpServerConfig {
  schema: GraphQLSchema;
  rootValue: any; // Adjust based on your resolver types
  toolName: string;
  toolDescription: string;
  toolSchema: {
    query: z.ZodString;
    variables?: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
  };
  serverName?: string;
  serverVersion?: string;
}

export class McpServerBase {
  private mcpServer: McpServer;
  private app: express.Express;
  private transport: SSEServerTransport | null = null;
  private schema: GraphQLSchema;
  private rootValue: any;
  private toolName: string;
  private toolDescription: string;
  private toolSchema: McpServerConfig["toolSchema"];
  private serverName: string;
  private serverVersion: string;

  constructor({
    schema,
    rootValue,
    toolName,
    toolDescription,
    toolSchema,
    serverName = "generic-server",
    serverVersion = "1.0.0",
  }: McpServerConfig) {
    this.schema = schema;
    this.rootValue = rootValue;
    this.toolName = toolName;
    this.toolDescription = toolDescription;
    this.toolSchema = toolSchema;
    this.serverName = serverName;
    this.serverVersion = serverVersion;

    this.mcpServer = new McpServer({
      name: this.serverName,
      version: this.serverVersion,
    });
    this.app = express();

    this.initializeTool();
    this.setupRoutes();
    this.startServer();
  }

  private initializeTool(): void {
    this.mcpServer.tool(
      this.toolName,
      this.toolDescription,
      this.toolSchema,
      async (args: ToolArgs): Promise<ToolResponse> => {
        try {
          const response = await graphql({
            schema: this.schema,
            source: args.query,
            rootValue: this.rootValue,
            variableValues: args.variables as Maybe<{ readonly [variable: string]: unknown }> ?? undefined,
          });

          if (response.errors?.length) {
            throw new Error(response.errors.map((e) => e.message).join(", "));
          }

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify(response.data, null, 2),
              },
            ],
          };
        } catch (error: any) {
          console.error(`Error executing ${this.toolName}:`, error);
          return {
            content: [
              {
                type: "text",
                text: `❌ ${this.toolName} execution failed: ${error.message}`,
              },
            ],
            isError: true,
          };
        }
      }
    );
  }

  private setupRoutes(): void {
    this.app.get("/sse", async (_req: Request, res: Response) => {
      this.transport = new SSEServerTransport("/messages", res);
      await this.mcpServer.connect(this.transport);
    });

    this.app.post("/messages", async (req: Request, res: Response) => {
      if (this.transport) {
        await this.transport.handlePostMessage(req, res);
      } else {
        res.status(400).send("No transport found for sessionId");
      }
    });

    this.app.get("/", (_req: Request, res: Response) => {
      res.send(`Hello from ${this.serverName} API`);
    });
  }

  private startServer(): void {
    connectDB()
      .then(() => {
        this.app.listen(PORT, () => {
          console.log(`Server is listening on PORT: ${PORT}`);
        });
      })
      .catch((err: Error) => {
        console.error("Error connecting to database:", err);
      });
  }

  public getApp(): express.Express {
    return this.app;
  }

  public getMcpServer(): McpServer {
    return this.mcpServer;
  }
}