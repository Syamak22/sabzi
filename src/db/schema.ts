import { integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
});

// status : "draft" | "published"
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 220 }).notNull().unique(),
  excerpt: text("excerpt").notNull().default(""),
  contentMd: text("content_md").notNull().default(""),
  coverImageUrl: varchar("cover_image_url", { length: 500 }).notNull().default(""),
  coverImageAlt: varchar("cover_image_alt", { length: 255 }).notNull().default(""),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  metaTitle: varchar("meta_title", { length: 255 }).notNull().default(""),
  metaDescription: varchar("meta_description", { length: 500 }).notNull().default(""),
  focusKeyword: varchar("focus_keyword", { length: 120 }).notNull().default(""),
  readingMinutes: integer("reading_minutes").notNull().default(1),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "set null" }),
  ...timestamps,
});

// Pages locales : un seul modèle, les champs ci-dessous sont les blocs uniques de chaque ville.
export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull().unique(),
  department: varchar("department", { length: 120 }).notNull().default(""),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  contextMd: text("context_md").notNull().default(""),
  nearbyMd: text("nearby_md").notNull().default(""),
  useCaseTitle: varchar("use_case_title", { length: 200 }).notNull().default(""),
  useCaseMd: text("use_case_md").notNull().default(""),
  faqQuestion: varchar("faq_question", { length: 255 }).notNull().default(""),
  faqAnswer: text("faq_answer").notNull().default(""),
  metaDescription: varchar("meta_description", { length: 500 }).notNull().default(""),
  position: integer("position").notNull().default(0),
  ...timestamps,
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  slug: varchar("slug", { length: 220 }).notNull().unique(),
  clientName: varchar("client_name", { length: 160 }).notNull().default(""),
  serviceType: varchar("service_type", { length: 80 }).notNull().default(""),
  summary: text("summary").notNull().default(""),
  contentMd: text("content_md").notNull().default(""),
  coverImageUrl: varchar("cover_image_url", { length: 500 }).notNull().default(""),
  coverImageAlt: varchar("cover_image_alt", { length: 255 }).notNull().default(""),
  status: varchar("status", { length: 20 }).notNull().default("draft"),
  position: integer("position").notNull().default(0),
  ...timestamps,
});

// stage : "nouveau" | "contacte" | "reunion" | "devis" | "gagne" | "perdu"
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 160 }).notNull().default(""),
  phone: varchar("phone", { length: 40 }).notNull().default(""),
  message: text("message").notNull(),
  stage: varchar("stage", { length: 20 }).notNull().default("nouveau"),
  source: varchar("source", { length: 500 }).notNull().default(""),
  notes: text("notes").notNull().default(""),
  ...timestamps,
});

export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  filename: varchar("filename", { length: 255 }).notNull().unique(),
  alt: varchar("alt", { length: 255 }).notNull().default(""),
  mime: varchar("mime", { length: 80 }).notNull(),
  size: integer("size").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Mots-clés suivis dans le centre SEO.
export const keywords = pgTable("keywords", {
  id: serial("id").primaryKey(),
  term: varchar("term", { length: 200 }).notNull().unique(),
  targetPath: varchar("target_path", { length: 300 }).notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Post = typeof posts.$inferSelect;
export type City = typeof cities.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Media = typeof media.$inferSelect;
export type Keyword = typeof keywords.$inferSelect;
