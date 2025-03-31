import dotenv from "dotenv";

dotenv.config();

export const API_BASE_URL: string = process.env.API_BASE_URL || "";
export const PORT: number = parseInt(process.env.PORT || "3000", 10);