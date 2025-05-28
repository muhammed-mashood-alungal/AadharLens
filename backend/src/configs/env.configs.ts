import dotenv from "dotenv";
import { envSchema } from "../schema/env.schema";

dotenv.config();

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.log("Invalid .env Config", parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
