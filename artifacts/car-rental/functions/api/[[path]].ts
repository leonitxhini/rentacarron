/// <reference types="@cloudflare/workers-types" />
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";
import { cors } from "hono/cors";
import { z } from "zod";

type Env = {
  DB: D1Database;
  IMAGES: R2Bucket;
  ADMIN_SECRET: string;
  R2_PUBLIC_URL: string;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseJson<T>(val: string | null | undefined, fallback: T): T {
  if (!val) return fallback;
  try { return JSON.parse(val) as T; } catch { return fallback; }
}

function formatCar(row: Record<string, unknown>) {
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    year: row.year,
    color: row.color,
    category: row.category,
    transmission: row.transmission,
    fuelType: row.fuel_type,
    seats: row.seats,
    bags: row.bags,
    pricePerDay: Number(row.price_per_day),
    available: Boolean(row.available),
    imageUrl: row.image_url ?? null,
    images: parseJson<string[]>(row.images as string, []),
    features: parseJson<string[]>(row.features as string, []),
    description: row.description ?? null,
    createdAt: row.created_at,
  };
}

function formatLocation(row: Record<string, unknown>) {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    city: row.city,
    country: row.country,
    isAirport: Boolean(row.is_airport),
    active: Boolean(row.active),
  };
}

function formatBooking(
  row: Record<string, unknown>,
  car?: Record<string, unknown> | null,
  pickupLoc?: Record<string, unknown> | null,
  dropoffLoc?: Record<string, unknown> | null,
) {
  return {
    id: row.id,
    carId: row.car_id,
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    pickupLocationId: row.pickup_location_id,
    dropoffLocationId: row.dropoff_location_id,
    pickupDate: row.pickup_date,
    dropoffDate: row.dropoff_date,
    totalDays: row.total_days,
    totalPrice: Number(row.total_price),
    status: row.status,
    notes: row.notes ?? null,
    createdAt: row.created_at,
    car: car ? formatCar(car) : null,
    pickupLocation: pickupLoc ? formatLocation(pickupLoc) : null,
    dropoffLocation: dropoffLoc ? formatLocation(dropoffLoc) : null,
  };
}

// ─── App ─────────────────────────────────────────────────────────────────────

const app = new Hono<{ Bindings: Env }>();

app.use("*", cors({ origin: "*", credentials: false }));

const requireAdmin = async (c: any, next: any) => {
  const secret = c.env.ADMIN_SECRET ?? "ermal123admin";
  const auth = c.req.header("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || token !== secret) return c.json({ error: "Unauthorized" }, 401);
  return next();
};

// ─── Health ──────────────────────────────────────────────────────────────────

app.get("/api/healthz", (c) => c.json({ status: "ok" }));

// ─── Cars ────────────────────────────────────────────────────────────────────

app.get("/api/cars", async (c) => {
  const { available, category } = c.req.query();
  let sql = "SELECT * FROM cars WHERE 1=1";
  const params: unknown[] = [];
  if (available !== undefined) {
    sql += " AND available = ?";
    params.push(available === "true" ? 1 : 0);
  }
  if (category) {
    sql += " AND LOWER(category) = LOWER(?)";
    params.push(category);
  }
  const { results } = await c.env.DB.prepare(sql).bind(...params).all();
  return c.json(results.map(formatCar));
});

app.get("/api/cars/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const row = await c.env.DB.prepare("SELECT * FROM cars WHERE id = ?").bind(id).first();
  if (!row) return c.json({ error: "Car not found" }, 404);
  return c.json(formatCar(row as Record<string, unknown>));
});

app.post("/api/cars", requireAdmin, async (c) => {
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
  const result = await c.env.DB.prepare(
    `INSERT INTO cars (make,model,year,color,category,transmission,fuel_type,seats,bags,price_per_day,available,image_url,images,features,description,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now')) RETURNING *`
  ).bind(
    data.make, data.model, data.year, data.color, data.category,
    data.transmission, data.fuelType, data.seats, data.bags,
    data.pricePerDay, data.available ? 1 : 0,
    data.imageUrl ?? null,
    JSON.stringify(data.images ?? []),
    JSON.stringify(data.features ?? []),
    data.description ?? null,
  ).first();
  return c.json(formatCar(result as Record<string, unknown>), 201);
});

app.put("/api/cars/:id", requireAdmin, async (c) => {
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
  const result = await c.env.DB.prepare(
    `UPDATE cars SET make=?,model=?,year=?,color=?,category=?,transmission=?,fuel_type=?,seats=?,bags=?,
     price_per_day=?,available=?,image_url=?,images=?,features=?,description=?
     WHERE id=? RETURNING *`
  ).bind(
    data.make, data.model, data.year, data.color, data.category,
    data.transmission, data.fuelType, data.seats, data.bags,
    data.pricePerDay, data.available ? 1 : 0,
    data.imageUrl ?? null,
    JSON.stringify(data.images ?? []),
    JSON.stringify(data.features ?? []),
    data.description ?? null, id,
  ).first();
  if (!result) return c.json({ error: "Car not found" }, 404);
  return c.json(formatCar(result as Record<string, unknown>));
});

app.delete("/api/cars/:id", requireAdmin, async (c) => {
  const id = parseInt(c.req.param("id"));
  await c.env.DB.prepare("DELETE FROM cars WHERE id = ?").bind(id).run();
  return c.json({ success: true });
});

// ─── Locations ────────────────────────────────────────────────────────────────

app.get("/api/locations", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM locations").all();
  return c.json(results.map(formatLocation));
});

app.post("/api/locations", requireAdmin, async (c) => {
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
  const result = await c.env.DB.prepare(
    `INSERT INTO locations (name,address,city,country,is_airport,active) VALUES (?,?,?,?,?,?) RETURNING *`
  ).bind(data.name, data.address, data.city, data.country, data.isAirport ? 1 : 0, data.active ? 1 : 0).first();
  return c.json(formatLocation(result as Record<string, unknown>), 201);
});

app.put("/api/locations/:id", requireAdmin, async (c) => {
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
  const result = await c.env.DB.prepare(
    `UPDATE locations SET name=?,address=?,city=?,country=?,is_airport=?,active=? WHERE id=? RETURNING *`
  ).bind(data.name, data.address, data.city, data.country, data.isAirport ? 1 : 0, data.active ? 1 : 0, id).first();
  if (!result) return c.json({ error: "Location not found" }, 404);
  return c.json(formatLocation(result as Record<string, unknown>));
});

app.delete("/api/locations/:id", requireAdmin, async (c) => {
  const id = parseInt(c.req.param("id"));
  await c.env.DB.prepare("DELETE FROM locations WHERE id = ?").bind(id).run();
  return c.json({ success: true });
});

// ─── Bookings ─────────────────────────────────────────────────────────────────

app.get("/api/bookings", requireAdmin, async (c) => {
  const status = c.req.query("status");
  let sql = "SELECT * FROM bookings";
  const params: unknown[] = [];
  if (status) { sql += " WHERE status = ?"; params.push(status); }
  sql += " ORDER BY created_at DESC";
  const { results: bRows } = await c.env.DB.prepare(sql).bind(...params).all();
  const { results: cRows } = await c.env.DB.prepare("SELECT * FROM cars").all();
  const { results: lRows } = await c.env.DB.prepare("SELECT * FROM locations").all();
  const carMap = new Map(cRows.map((r) => [(r as any).id, r as Record<string, unknown>]));
  const locMap = new Map(lRows.map((r) => [(r as any).id, r as Record<string, unknown>]));
  return c.json(bRows.map((b: any) => formatBooking(b, carMap.get(b.car_id), locMap.get(b.pickup_location_id), locMap.get(b.dropoff_location_id))));
});

app.get("/api/bookings/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const b = await c.env.DB.prepare("SELECT * FROM bookings WHERE id = ?").bind(id).first() as any;
  if (!b) return c.json({ error: "Booking not found" }, 404);
  const car = await c.env.DB.prepare("SELECT * FROM cars WHERE id = ?").bind(b.car_id).first();
  const pickupLoc = await c.env.DB.prepare("SELECT * FROM locations WHERE id = ?").bind(b.pickup_location_id).first();
  const dropoffLoc = await c.env.DB.prepare("SELECT * FROM locations WHERE id = ?").bind(b.dropoff_location_id).first();
  return c.json(formatBooking(b, car as any, pickupLoc as any, dropoffLoc as any));
});

app.post("/api/bookings", async (c) => {
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
  const totalDays = Math.max(1, Math.ceil(
    (new Date(data.dropoffDate).getTime() - new Date(data.pickupDate).getTime()) / 86400000,
  ));
  const car = await c.env.DB.prepare("SELECT * FROM cars WHERE id = ?").bind(data.carId).first() as any;
  if (!car) return c.json({ error: "Car not found" }, 404);
  const totalPrice = totalDays * Number(car.price_per_day);
  const booking = await c.env.DB.prepare(
    `INSERT INTO bookings (car_id,customer_name,customer_email,customer_phone,pickup_location_id,dropoff_location_id,
     pickup_date,dropoff_date,total_days,total_price,status,notes,created_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,datetime('now')) RETURNING *`
  ).bind(
    data.carId, data.customerName, data.customerEmail, data.customerPhone,
    data.pickupLocationId, data.dropoffLocationId,
    data.pickupDate, data.dropoffDate, totalDays, totalPrice,
    "pending", data.notes ?? null,
  ).first() as any;
  const pickupLoc = await c.env.DB.prepare("SELECT * FROM locations WHERE id = ?").bind(booking.pickup_location_id).first();
  const dropoffLoc = await c.env.DB.prepare("SELECT * FROM locations WHERE id = ?").bind(booking.dropoff_location_id).first();
  return c.json(formatBooking(booking, car, pickupLoc as any, dropoffLoc as any), 201);
});

app.put("/api/bookings/:id", requireAdmin, async (c) => {
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
  const existing = await c.env.DB.prepare("SELECT * FROM bookings WHERE id = ?").bind(id).first() as any;
  if (!existing) return c.json({ error: "Booking not found" }, 404);
  const fields: string[] = ["status = ?"];
  const vals: unknown[] = [data.status];
  if (data.notes !== undefined) { fields.push("notes = ?"); vals.push(data.notes ?? null); }
  if (data.customerName) { fields.push("customer_name = ?"); vals.push(data.customerName); }
  if (data.customerEmail) { fields.push("customer_email = ?"); vals.push(data.customerEmail); }
  if (data.customerPhone) { fields.push("customer_phone = ?"); vals.push(data.customerPhone); }
  if (data.pickupLocationId) { fields.push("pickup_location_id = ?"); vals.push(data.pickupLocationId); }
  if (data.dropoffLocationId) { fields.push("dropoff_location_id = ?"); vals.push(data.dropoffLocationId); }
  if (data.pickupDate) { fields.push("pickup_date = ?"); vals.push(data.pickupDate); }
  if (data.dropoffDate) { fields.push("dropoff_date = ?"); vals.push(data.dropoffDate); }
  vals.push(id);
  const booking = await c.env.DB.prepare(`UPDATE bookings SET ${fields.join(", ")} WHERE id = ? RETURNING *`).bind(...vals).first() as any;
  const car = await c.env.DB.prepare("SELECT * FROM cars WHERE id = ?").bind(booking.car_id).first();
  const pickupLoc = await c.env.DB.prepare("SELECT * FROM locations WHERE id = ?").bind(booking.pickup_location_id).first();
  const dropoffLoc = await c.env.DB.prepare("SELECT * FROM locations WHERE id = ?").bind(booking.dropoff_location_id).first();
  return c.json(formatBooking(booking, car as any, pickupLoc as any, dropoffLoc as any));
});

app.delete("/api/bookings/:id", requireAdmin, async (c) => {
  const id = parseInt(c.req.param("id"));
  await c.env.DB.prepare("DELETE FROM bookings WHERE id = ?").bind(id).run();
  return c.json({ success: true });
});

// ─── Admin Stats ──────────────────────────────────────────────────────────────

app.get("/api/admin/stats", requireAdmin, async (c) => {
  const { results: allCars } = await c.env.DB.prepare("SELECT * FROM cars").all() as any;
  const { results: allBookings } = await c.env.DB.prepare("SELECT * FROM bookings ORDER BY created_at DESC").all() as any;
  const { results: allLocs } = await c.env.DB.prepare("SELECT * FROM locations").all() as any;
  const carMap = new Map(allCars.map((r: any) => [r.id, r]));
  const locMap = new Map(allLocs.map((r: any) => [r.id, r]));
  return c.json({
    totalCars: allCars.length,
    availableCars: allCars.filter((r: any) => Boolean(r.available)).length,
    totalBookings: allBookings.length,
    pendingBookings: allBookings.filter((b: any) => b.status === "pending").length,
    confirmedBookings: allBookings.filter((b: any) => b.status === "confirmed").length,
    completedBookings: allBookings.filter((b: any) => b.status === "completed").length,
    cancelledBookings: allBookings.filter((b: any) => b.status === "cancelled").length,
    totalRevenue: allBookings.filter((b: any) => b.status !== "cancelled").reduce((s: number, b: any) => s + Number(b.total_price), 0),
    recentBookings: allBookings.slice(0, 5).map((b: any) => formatBooking(b, carMap.get(b.car_id), locMap.get(b.pickup_location_id), locMap.get(b.dropoff_location_id))),
  });
});

// ─── Image Upload (R2) ────────────────────────────────────────────────────────

app.post("/api/upload/car-image", requireAdmin, async (c) => {
  const formData = await c.req.formData();
  const file = formData.get("image") as File | null;
  if (!file || !(file instanceof File)) return c.json({ error: "No image file provided" }, 400);
  if (!file.type.startsWith("image/")) return c.json({ error: "Only image files allowed" }, 400);
  if (file.size > 8 * 1024 * 1024) return c.json({ error: "File too large (max 8MB)" }, 400);
  const ext = file.name.split(".").pop() ?? "jpg";
  const key = `cars/car-${Date.now()}.${ext}`;
  await c.env.IMAGES.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
  const publicUrl = c.env.R2_PUBLIC_URL?.replace(/\/+$/, "");
  const url = publicUrl ? `${publicUrl}/${key}` : `/images/${key}`;
  return c.json({ url });
});

// ─── Export ───────────────────────────────────────────────────────────────────

export const onRequest = handle(app);
