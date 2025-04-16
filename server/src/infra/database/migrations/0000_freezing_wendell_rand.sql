CREATE TABLE "links" (
	"id" uuid PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"alias" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_alias_unique" UNIQUE("alias")
);
