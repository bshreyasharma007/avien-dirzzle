import { config } from "dotenv"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"
config({ path: ".env.local" })

export const sql = neon(process.env.DATABASE_URL!)
export const database = drizzle(sql, { schema })
