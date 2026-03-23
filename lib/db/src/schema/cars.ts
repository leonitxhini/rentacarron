import { pgTable, serial, text, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const carsTable = pgTable("cars", {
  id: serial("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  color: text("color").notNull(),
  category: text("category").notNull(),
  transmission: text("transmission").notNull().default("automatic"),
  fuelType: text("fuel_type").notNull().default("diesel"),
  seats: integer("seats").notNull().default(5),
  bags: integer("bags").notNull().default(3),
  pricePerDay: numeric("price_per_day", { precision: 10, scale: 2 }).notNull(),
  available: boolean("available").notNull().default(true),
  imageUrl: text("image_url"),
  features: text("features").array().notNull().default([]),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCarSchema = createInsertSchema(carsTable).omit({ id: true, createdAt: true });
export type InsertCar = z.infer<typeof insertCarSchema>;
export type Car = typeof carsTable.$inferSelect;
