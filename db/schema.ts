import { z } from "zod"
import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { relations } from "drizzle-orm"

export const avatar = pgTable("avatar", {
  id: text("id").primaryKey(),
  role: text("role"),
})

// One account can have multiple messages
export const avatarRelation = relations(avatar, ({ many }: any) => ({
  messages: many(messages),
}))

export const insertavatarSchema = createInsertSchema(avatar)

export const messages = pgTable("messages", {
  id: text("id").primaryKey(),
  content: text("content"),
  createdAt: timestamp("date", { mode: "date" }).notNull(),
  avatarId: text("avatar")
    .references(() => avatar.id, {
      onDelete: "cascade",
    })
    .notNull(),
})

// We are overriding the date here
export const insertmessagesSchema = createInsertSchema(messages, {
  createdAt: z.coerce.date(),
})

// One message can only belong to one account
export const messageRelation = relations(messages, ({ one }: any) => ({
  avatar: one(avatar, {
    fields: [messages.avatarId],
    references: [avatar.id],
  }),
}))
