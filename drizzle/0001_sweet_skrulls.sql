CREATE TABLE "keywords" (
	"id" serial PRIMARY KEY NOT NULL,
	"term" varchar(200) NOT NULL,
	"target_path" varchar(300) DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "keywords_term_unique" UNIQUE("term")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"filename" varchar(255) NOT NULL,
	"alt" varchar(255) DEFAULT '' NOT NULL,
	"mime" varchar(80) NOT NULL,
	"size" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_filename_unique" UNIQUE("filename")
);
--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "notes" text DEFAULT '' NOT NULL;