CREATE TABLE IF NOT EXISTS "avatar" (
	"id" text PRIMARY KEY NOT NULL,
	"role" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text,
	"date" timestamp NOT NULL,
	"avatar" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_avatar_avatar_id_fk" FOREIGN KEY ("avatar") REFERENCES "public"."avatar"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
