//Script which will be run by node js

// migrate.ts
import "dotenv/config"
import { migrate } from "drizzle-orm/postgres-js/migrator"
import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js"
import postgres from "postgres"

import { config } from "dotenv"
config({ path: "../.env.local" })

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is not set")
}

const migrationClient = postgres(DATABASE_URL, { max: 1 })
const db: PostgresJsDatabase = drizzle(migrationClient)

const main = async () => {
  console.log("Migrating database...")
  await migrate(db, { migrationsFolder: "./drizzle" })
  await migrationClient.end()
  console.log("Database migrated successfully!")
}

main()

//Reference: https://www.codu.co/articles/running-migrations-in-drizzle-for-postgresql-fmybrgui
