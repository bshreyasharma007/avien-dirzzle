import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Load environment variables from a file
config({ path: "../.env.local" })

// Create a PostgreSQL client
const sql = postgres(process.env.DATABASE_URL!)

// Initialize Drizzle ORM with the PostgreSQL client and schema
export const database = drizzle(sql, { schema })
