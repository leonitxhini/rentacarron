import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { carsTable, insertCarSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

function normalizeCarBody(body: Record<string, unknown>) {
  return {
    ...body,
    pricePerDay: body.pricePerDay != null ? String(body.pricePerDay) : body.pricePerDay,
    year: body.year != null ? Number(body.year) : body.year,
    seats: body.seats != null ? Number(body.seats) : body.seats,
    bags: body.bags != null ? Number(body.bags) : body.bags,
  };
}

const PRODUCTION_ORIGINS = ["https://rentacarron.replit.app", "https://rentacarron.com"];

function resolveImageUrl(url: string | null, isLocalDev: boolean): string | null {
  if (!url) return null;
  // Strip known production origins to get the path component
  for (const origin of PRODUCTION_ORIGINS) {
    if (url.startsWith(origin)) {
      const path = url.slice(origin.length);
      // In local dev: return just the path — served from car-rental's own public folder via Replit proxy
      // In production: return the full production URL as-is
      return isLocalDev ? path : url;
    }
  }
  if (url.startsWith("/")) return url;
  return url;
}

function formatCar(car: typeof carsTable.$inferSelect, isLocalDev: boolean = false) {
  return {
    ...car,
    pricePerDay: Number(car.pricePerDay),
    features: car.features || [],
    images: (car.images || []).map(img => resolveImageUrl(img, isLocalDev)).filter(Boolean) as string[],
    imageUrl: resolveImageUrl(car.imageUrl, isLocalDev),
    description: car.description || null,
    createdAt: car.createdAt.toISOString(),
  };
}

function isLocalDev(_req: import("express").Request): boolean {
  return process.env.NODE_ENV !== "production";
}

router.get("/", async (req, res) => {
  try {
    const { available, category } = req.query;
    const rows = await db.select().from(carsTable);
    let filtered = rows;
    if (available !== undefined) {
      const isAvailable = available === "true";
      filtered = filtered.filter(c => c.available === isAvailable);
    }
    if (category) {
      filtered = filtered.filter(c => c.category.toLowerCase() === (category as string).toLowerCase());
    }
    res.json(filtered.map(c => formatCar(c, isLocalDev(req))));
  } catch (err) {
    req.log.error({ err }, "Failed to list cars");
    res.status(500).json({ error: "Failed to list cars" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await db.select().from(carsTable).where(eq(carsTable.id, id));
    if (rows.length === 0) {
      res.status(404).json({ error: "Car not found" });
      return;
    }
    res.json(formatCar(rows[0], isLocalDev(req)));
  } catch (err) {
    req.log.error({ err }, "Failed to get car");
    res.status(500).json({ error: "Failed to get car" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = insertCarSchema.parse(normalizeCarBody(req.body));
    const rows = await db.insert(carsTable).values(data).returning();
    res.status(201).json(formatCar(rows[0], isLocalDev(req)));
  } catch (err) {
    req.log.error({ err }, "Failed to create car");
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: err.issues });
      return;
    }
    res.status(500).json({ error: "Failed to create car" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = insertCarSchema.parse(normalizeCarBody(req.body));
    const rows = await db.update(carsTable).set(data).where(eq(carsTable.id, id)).returning();
    if (rows.length === 0) {
      res.status(404).json({ error: "Car not found" });
      return;
    }
    res.json(formatCar(rows[0], isLocalDev(req)));
  } catch (err) {
    req.log.error({ err }, "Failed to update car");
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: err.issues });
      return;
    }
    res.status(500).json({ error: "Failed to update car" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(carsTable).where(eq(carsTable.id, id));
    res.json({ success: true, message: "Car deleted" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete car");
    res.status(500).json({ error: "Failed to delete car" });
  }
});

export default router;
