/// <reference types="@cloudflare/workers-types" />
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import {
  sqliteTable,
  integer,
  text,
  real,
} from "drizzle-orm/sqlite-core";
import { eq } from "drizzle-orm";
import { z } from "zod";

// ─── Env ─────────────────────────────────────────────────────────────────────

type Env = {
  DB: D1Database;
  IMAGES: R2Bucket;
  ADMIN_SECRET: string;
  R2_PUBLIC_URL: string;
};

// ─── D1 Schema ───────────────────────────────────────────────────────────────

const cars = sqliteTable("cars", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  color: text("color").notNull(),
  category: text("category").notNull(),
  transmission: text("transmission").notNull().default("automatic"),
  fuelType: text("fuel_type").notNull().default("diesel"),
  seats: integer("seats").notNull().default(5),
  bags: integer("bags").notNull().default(3),
  pricePerDay: real("price_per_day").notNull(),
  available: integer("available", { mode: "boolean" }).notNull().default(true),
  imageUrl: text("image_url"),
  images: text("images").notNull().default("[]"),
  features: text("features").notNull().default("[]"),
  description: text("description"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

const locations = sqliteTable("locations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
  isAirport: integer("is_airport", { mode: "boolean" }).notNull().default(false),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
});

const bookings = sqliteTable("bookings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  carId: integer("car_id").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  pickupLocationId: integer("pickup_location_id").notNull(),
  dropoffLocationId: integer("dropoff_location_id").notNull(),
  pickupDate: text("pickup_date").notNull(),
  dropoffDate: text("dropoff_date").notNull(),
  totalDays: integer("total_days").notNull(),
  totalPrice: real("total_price").notNull(),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().$defaultFn(() => new Date().toISOString()),
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseJson<T>(val: string | null | undefined, fallback: T): T {
  if (!val) return fallback;
  try { return JSON.parse(val) as T; } catch { return fallback; }
}

function formatCar(car: typeof cars.$inferSelect) {
  return {
    ...car,
    pricePerDay: Number(car.pricePerDay),
    features: parseJson<string[]>(car.features, []),
    images: parseJson<string[]>(car.images, []),
    available: Boolean(car.available),
  };
}

function formatLocation(loc: typeof locations.$inferSelect) {
  return {
    ...loc,
    isAirport: Boolean(loc.isAirport),
    active: Boolean(loc.active),
  };
}

function formatBooking(
  booking: typeof bookings.$inferSelect,
  car?: typeof cars.$inferSelect | null,
  pickupLoc?: typeof locations.$inferSelect | null,
  dropoffLoc?: typeof locations.$inferSelect | null,
) {
  return {
    ...booking,
    totalPrice: Number(booking.totalPrice),
    available: car ? Boolean(car.available) : undefined,
    car: car ? formatCar(car) : null,
    pickupLocation: pickupLoc ? formatLocation(pickupLoc) : null,
    dropoffLocation: dropoffLoc ? formatLocation(dropoffLoc) : null,
    notes: booking.notes ?? null,
  };
}

// ─── App ─────────────────────────────────────────────────────────────────────

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({ origin: "*", credentials: false }));

// Admin middleware
const requireAdmin = async (c: any, next: any) => {
  const secret = c.env.ADMIN_SECRET ?? "admin123";
  const auth = c.req.header("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || token !== secret) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  return next();
};

// ─── Health ──────────────────────────────────────────────────────────────────

app.get("/api/healthz", (c) => c.json({ status: "ok" }));

// ─── Cars ────────────────────────────────────────────────────────────────────

app.get("/api/cars", async (c) => {
  const db = drizzle(c.env.DB);
  const rows = await db.select().from(cars);
  const { available, category } = c.req.query();
  let filtered = rows;
  if (available !== undefined) {
    const isAvail = available === "true";
    filtered = filtered.filter((r) => Boolean(r.available) === isAvail);
  }
  if (category) {
    filtered = filtered.filter(
      (r) => r.category.toLowerCase() === category.toLowerCase(),
    );
  }
  return c.json(filtered.map(formatCar));
});

app.get("/api/cars/:id", async (c) => {
  const db = drizzle(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const rows = await db.select().from(cars).where(eq(cars.id, id));
  if (!rows[0]) return c.json({ error: "Car not found" }, 404);
  return c.json(formatCar(rows[0]));
});

app.post("/api/cars", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const body = await c.req.json<Record<string, unknown>>();
  const schema = z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().int(),
    color: z.string().min(1),
    category: z.string().min(1),
    transmission: z.string().default("automatic"),
    fuelType: z.string().default("diesel"),
    seats: z.number().int().default(5),
    bags: z.number().int().default(3),
    pricePerDay: z.number(),
    available: z.boolean().default(true),
    imageUrl: z.string().nullable().optional(),
    images: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    description: z.string().nullable().optional(),
  });
  const data = schema.parse({
    ...body,
    pricePerDay: Number(body.pricePerDay),
    year: Number(body.year),
    seats: Number(body.seats),
    bags: Number(body.bags),
  });
  const rows = await db.insert(cars).values({
    ...data,
    features: JSON.stringify(data.features ?? []),
    images: JSON.stringify(data.images ?? []),
  }).returning();
  return c.json(formatCar(rows[0]), 201);
});

app.put("/api/cars/:id", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json<Record<string, unknown>>();
  const schema = z.object({
    make: z.string().min(1),
    model: z.string().min(1),
    year: z.number().int(),
    color: z.string().min(1),
    category: z.string().min(1),
    transmission: z.string().default("automatic"),
    fuelType: z.string().default("diesel"),
    seats: z.number().int().default(5),
    bags: z.number().int().default(3),
    pricePerDay: z.number(),
    available: z.boolean().default(true),
    imageUrl: z.string().nullable().optional(),
    images: z.array(z.string()).optional(),
    features: z.array(z.string()).optional(),
    description: z.string().nullable().optional(),
  });
  const data = schema.parse({
    ...body,
    pricePerDay: Number(body.pricePerDay),
    year: Number(body.year),
    seats: Number(body.seats),
    bags: Number(body.bags),
  });
  const rows = await db.update(cars).set({
    ...data,
    features: JSON.stringify(data.features ?? []),
    images: JSON.stringify(data.images ?? []),
  }).where(eq(cars.id, id)).returning();
  if (!rows[0]) return c.json({ error: "Car not found" }, 404);
  return c.json(formatCar(rows[0]));
});

app.delete("/api/cars/:id", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const id = parseInt(c.req.param("id"));
  await db.delete(cars).where(eq(cars.id, id));
  return c.json({ success: true });
});

// ─── Locations ───────────────────────────────────────────────────────────────

app.get("/api/locations", async (c) => {
  const db = drizzle(c.env.DB);
  const rows = await db.select().from(locations);
  return c.json(rows.map(formatLocation));
});

app.post("/api/locations", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const body = await c.req.json();
  const schema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    isAirport: z.boolean().default(false),
    active: z.boolean().default(true),
  });
  const data = schema.parse(body);
  const rows = await db.insert(locations).values(data).returning();
  return c.json(formatLocation(rows[0]), 201);
});

app.put("/api/locations/:id", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  const schema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    country: z.string().min(1),
    isAirport: z.boolean().default(false),
    active: z.boolean().default(true),
  });
  const data = schema.parse(body);
  const rows = await db.update(locations).set(data).where(eq(locations.id, id)).returning();
  if (!rows[0]) return c.json({ error: "Location not found" }, 404);
  return c.json(formatLocation(rows[0]));
});

app.delete("/api/locations/:id", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const id = parseInt(c.req.param("id"));
  await db.delete(locations).where(eq(locations.id, id));
  return c.json({ success: true });
});

// ─── Bookings ────────────────────────────────────────────────────────────────

app.get("/api/bookings", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const allBookings = await db.select().from(bookings);
  const allCars = await db.select().from(cars);
  const allLocs = await db.select().from(locations);
  const carMap = new Map(allCars.map((c) => [c.id, c]));
  const locMap = new Map(allLocs.map((l) => [l.id, l]));
  let filtered = allBookings;
  const status = c.req.query("status");
  if (status) filtered = filtered.filter((b) => b.status === status);
  return c.json(
    filtered.map((b) =>
      formatBooking(b, carMap.get(b.carId), locMap.get(b.pickupLocationId), locMap.get(b.dropoffLocationId)),
    ),
  );
});

app.get("/api/bookings/:id", async (c) => {
  const db = drizzle(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const rows = await db.select().from(bookings).where(eq(bookings.id, id));
  if (!rows[0]) return c.json({ error: "Booking not found" }, 404);
  const b = rows[0];
  const carRows = await db.select().from(cars).where(eq(cars.id, b.carId));
  const pickupRows = await db.select().from(locations).where(eq(locations.id, b.pickupLocationId));
  const dropoffRows = await db.select().from(locations).where(eq(locations.id, b.dropoffLocationId));
  return c.json(formatBooking(b, carRows[0], pickupRows[0], dropoffRows[0]));
});

app.post("/api/bookings", async (c) => {
  const db = drizzle(c.env.DB);
  const body = await c.req.json();
  const schema = z.object({
    carId: z.number().int(),
    customerName: z.string().min(1),
    customerEmail: z.string().email(),
    customerPhone: z.string().min(1),
    pickupLocationId: z.number().int(),
    dropoffLocationId: z.number().int(),
    pickupDate: z.string(),
    dropoffDate: z.string(),
    notes: z.string().nullable().optional(),
  });
  const data = schema.parse(body);
  const pickupDate = new Date(data.pickupDate);
  const dropoffDate = new Date(data.dropoffDate);
  const totalDays = Math.max(
    1,
    Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / 86400000),
  );
  const carRows = await db.select().from(cars).where(eq(cars.id, data.carId));
  if (!carRows[0]) return c.json({ error: "Car not found" }, 404);
  const car = carRows[0];
  const totalPrice = totalDays * Number(car.pricePerDay);
  const rows = await db.insert(bookings).values({
    ...data,
    totalDays,
    totalPrice,
    status: "pending",
    notes: data.notes ?? null,
    createdAt: new Date().toISOString(),
  }).returning();
  const booking = rows[0];
  const pickupLoc = await db.select().from(locations).where(eq(locations.id, booking.pickupLocationId));
  const dropoffLoc = await db.select().from(locations).where(eq(locations.id, booking.dropoffLocationId));
  return c.json(formatBooking(booking, car, pickupLoc[0], dropoffLoc[0]), 201);
});

app.put("/api/bookings/:id", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  const schema = z.object({
    status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
    notes: z.string().nullable().optional(),
    customerName: z.string().optional(),
    customerEmail: z.string().email().optional(),
    customerPhone: z.string().optional(),
    pickupLocationId: z.number().int().optional(),
    dropoffLocationId: z.number().int().optional(),
    pickupDate: z.string().optional(),
    dropoffDate: z.string().optional(),
  });
  const data = schema.parse(body);
  const existing = await db.select().from(bookings).where(eq(bookings.id, id));
  if (!existing[0]) return c.json({ error: "Booking not found" }, 404);
  const updateData: Partial<typeof bookings.$inferInsert> = { status: data.status };
  if (data.notes !== undefined) updateData.notes = data.notes ?? null;
  if (data.customerName) updateData.customerName = data.customerName;
  if (data.customerEmail) updateData.customerEmail = data.customerEmail;
  if (data.customerPhone) updateData.customerPhone = data.customerPhone;
  if (data.pickupLocationId) updateData.pickupLocationId = data.pickupLocationId;
  if (data.dropoffLocationId) updateData.dropoffLocationId = data.dropoffLocationId;
  if (data.pickupDate) updateData.pickupDate = data.pickupDate;
  if (data.dropoffDate) updateData.dropoffDate = data.dropoffDate;
  const rows = await db.update(bookings).set(updateData).where(eq(bookings.id, id)).returning();
  const booking = rows[0];
  const carRows = await db.select().from(cars).where(eq(cars.id, booking.carId));
  const pickupLoc = await db.select().from(locations).where(eq(locations.id, booking.pickupLocationId));
  const dropoffLoc = await db.select().from(locations).where(eq(locations.id, booking.dropoffLocationId));
  return c.json(formatBooking(booking, carRows[0], pickupLoc[0], dropoffLoc[0]));
});

app.delete("/api/bookings/:id", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const id = parseInt(c.req.param("id"));
  await db.delete(bookings).where(eq(bookings.id, id));
  return c.json({ success: true });
});

// ─── Admin Stats ─────────────────────────────────────────────────────────────

app.get("/api/admin/stats", requireAdmin, async (c) => {
  const db = drizzle(c.env.DB);
  const allCars = await db.select().from(cars);
  const allBookings = await db.select().from(bookings);
  const allLocs = await db.select().from(locations);
  const carMap = new Map(allCars.map((c) => [c.id, c]));
  const locMap = new Map(allLocs.map((l) => [l.id, l]));
  const totalCars = allCars.length;
  const availableCars = allCars.filter((c) => Boolean(c.available)).length;
  const totalBookings = allBookings.length;
  const pendingBookings = allBookings.filter((b) => b.status === "pending").length;
  const confirmedBookings = allBookings.filter((b) => b.status === "confirmed").length;
  const completedBookings = allBookings.filter((b) => b.status === "completed").length;
  const cancelledBookings = allBookings.filter((b) => b.status === "cancelled").length;
  const totalRevenue = allBookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + Number(b.totalPrice), 0);
  const recentBookings = [...allBookings]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map((b) => formatBooking(b, carMap.get(b.carId), locMap.get(b.pickupLocationId), locMap.get(b.dropoffLocationId)));
  return c.json({
    totalCars, availableCars, totalBookings,
    pendingBookings, confirmedBookings, completedBookings,
    cancelledBookings, totalRevenue, recentBookings,
  });
});

// ─── Image Upload (R2) ───────────────────────────────────────────────────────

app.post("/api/upload/car-image", requireAdmin, async (c) => {
  const formData = await c.req.formData();
  const file = formData.get("image") as File | null;
  if (!file || !(file instanceof File)) {
    return c.json({ error: "No image file provided" }, 400);
  }
  if (!file.type.startsWith("image/")) {
    return c.json({ error: "Only image files allowed" }, 400);
  }
  if (file.size > 8 * 1024 * 1024) {
    return c.json({ error: "File too large (max 8MB)" }, 400);
  }
  const ext = file.name.split(".").pop() ?? "jpg";
  const key = `cars/car-${Date.now()}.${ext}`;
  await c.env.IMAGES.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });
  const publicUrl = c.env.R2_PUBLIC_URL?.replace(/\/+$/, "");
  const url = publicUrl ? `${publicUrl}/${key}` : `/images/${key}`;
  return c.json({ url });
});

// ─── Export ──────────────────────────────────────────────────────────────────

export const onRequest = handle(app);
