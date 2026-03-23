import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { locationsTable, insertLocationSchema } from "@workspace/db";
import { eq } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

router.get("/", async (req, res) => {
  try {
    const rows = await db.select().from(locationsTable);
    res.json(rows);
  } catch (err) {
    req.log.error({ err }, "Failed to list locations");
    res.status(500).json({ error: "Failed to list locations" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = insertLocationSchema.parse(req.body);
    const rows = await db.insert(locationsTable).values(data).returning();
    res.status(201).json(rows[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to create location");
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: err.issues });
      return;
    }
    res.status(500).json({ error: "Failed to create location" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = insertLocationSchema.parse(req.body);
    const rows = await db.update(locationsTable).set(data).where(eq(locationsTable.id, id)).returning();
    if (rows.length === 0) {
      res.status(404).json({ error: "Location not found" });
      return;
    }
    res.json(rows[0]);
  } catch (err) {
    req.log.error({ err }, "Failed to update location");
    res.status(500).json({ error: "Failed to update location" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(locationsTable).where(eq(locationsTable.id, id));
    res.json({ success: true, message: "Location deleted" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete location");
    res.status(500).json({ error: "Failed to delete location" });
  }
});

export default router;
