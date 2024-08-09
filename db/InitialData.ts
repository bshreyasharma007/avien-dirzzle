import { database } from "./drizzle"
import { insertavatarSchema, avatar } from "./schema"
import cuid from "cuid"

async function initializeData() {
  // Sample data to insert
  //const InitialliseUser =
  // Validate data using Zod
  //const parsedUser = insertavatarSchema.parse(InitialliseUser)

  // Insert the validated data into the database
  //console.log("Inserting data:", InitialliseUser)
  const result = await database
    .insert(avatar)
    .values([
      {
        id: cuid(),
        role: "user",
      },
      {
        id: cuid(),
        role: "chatbot",
      },
    ])
    .returning()

  console.log("Initial Data successfully added")
  console.log("Database connection closed")
  process.exit(0) // Explicitly exit the process
}

initializeData()
