import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { carsTable, insertCarSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    let query = db.select().from(carsTable).$dynamic();
    
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
    
    const cars = filtered.map(car => ({
      ...car,
      pricePerDay: Number(car.pricePerDay),
      features: car.features || [],
      imageUrl: car.imageUrl || null,
      description: car.description || null,
      createdAt: car.createdAt.toISOString(),
    }));
    
    res.json(cars);
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
    const car = rows[0];
    res.json({
      ...car,
      pricePerDay: Number(car.pricePerDay),
      features: car.features || [],
      imageUrl: car.imageUrl || null,
      description: car.description || null,
      createdAt: car.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get car");
    res.status(500).json({ error: "Failed to get car" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = insertCarSchema.parse(req.body);
    const rows = await db.insert(carsTable).values({
      ...data,
      pricePerDay: String(data.pricePerDay),
    }).returning();
    const car = rows[0];
    res.status(201).json({
      ...car,
      pricePerDay: Number(car.pricePerDay),
      features: car.features || [],
      imageUrl: car.imageUrl || null,
      description: car.description || null,
      createdAt: car.createdAt.toISOString(),
    });
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
    const data = insertCarSchema.parse(req.body);
    const rows = await db.update(carsTable).set({
      ...data,
      pricePerDay: String(data.pricePerDay),
    }).where(eq(carsTable.id, id)).returning();
    if (rows.length === 0) {
      res.status(404).json({ error: "Car not found" });
      return;
    }
    const car = rows[0];
    res.json({
      ...car,
      pricePerDay: Number(car.pricePerDay),
      features: car.features || [],
      imageUrl: car.imageUrl || null,
      description: car.description || null,
      createdAt: car.createdAt.toISOString(),
    });
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
