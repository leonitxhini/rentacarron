import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { bookingsTable, carsTable, locationsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const router: IRouter = Router();

const createBookingSchema = z.object({
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

const updateBookingSchema = z.object({
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

function formatBooking(booking: any, car?: any, pickupLoc?: any, dropoffLoc?: any) {
  return {
    ...booking,
    totalPrice: Number(booking.totalPrice),
    car: car ? {
      ...car,
      pricePerDay: Number(car.pricePerDay),
      features: car.features || [],
      imageUrl: car.imageUrl || null,
      description: car.description || null,
      createdAt: car.createdAt instanceof Date ? car.createdAt.toISOString() : car.createdAt,
    } : null,
    pickupLocation: pickupLoc || null,
    dropoffLocation: dropoffLoc || null,
    createdAt: booking.createdAt instanceof Date ? booking.createdAt.toISOString() : booking.createdAt,
    notes: booking.notes || null,
  };
}

router.get("/", async (req, res) => {
  try {
    const rows = await db.select().from(bookingsTable);
    let filtered = rows;
    
    if (req.query.status) {
      filtered = filtered.filter(b => b.status === req.query.status);
    }
    if (req.query.carId) {
      const carId = parseInt(req.query.carId as string);
      filtered = filtered.filter(b => b.carId === carId);
    }
    
    const cars = await db.select().from(carsTable);
    const locations = await db.select().from(locationsTable);
    
    const carMap = new Map(cars.map(c => [c.id, c]));
    const locationMap = new Map(locations.map(l => [l.id, l]));
    
    const bookings = filtered.map(b => formatBooking(
      b,
      carMap.get(b.carId),
      locationMap.get(b.pickupLocationId),
      locationMap.get(b.dropoffLocationId)
    ));
    
    res.json(bookings);
  } catch (err) {
    req.log.error({ err }, "Failed to list bookings");
    res.status(500).json({ error: "Failed to list bookings" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const rows = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id));
    if (rows.length === 0) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    const booking = rows[0];
    
    const cars = await db.select().from(carsTable).where(eq(carsTable.id, booking.carId));
    const pickupLocs = await db.select().from(locationsTable).where(eq(locationsTable.id, booking.pickupLocationId));
    const dropoffLocs = await db.select().from(locationsTable).where(eq(locationsTable.id, booking.dropoffLocationId));
    
    res.json(formatBooking(booking, cars[0], pickupLocs[0], dropoffLocs[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to get booking");
    res.status(500).json({ error: "Failed to get booking" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = createBookingSchema.parse(req.body);
    
    const pickupDate = new Date(data.pickupDate);
    const dropoffDate = new Date(data.dropoffDate);
    const totalDays = Math.max(1, Math.ceil((dropoffDate.getTime() - pickupDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    const cars = await db.select().from(carsTable).where(eq(carsTable.id, data.carId));
    if (cars.length === 0) {
      res.status(404).json({ error: "Car not found" });
      return;
    }
    
    const car = cars[0];
    const totalPrice = totalDays * Number(car.pricePerDay);
    
    const rows = await db.insert(bookingsTable).values({
      carId: data.carId,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      pickupLocationId: data.pickupLocationId,
      dropoffLocationId: data.dropoffLocationId,
      pickupDate: data.pickupDate,
      dropoffDate: data.dropoffDate,
      totalDays,
      totalPrice: String(totalPrice),
      status: "pending",
      notes: data.notes || null,
    }).returning();
    
    const booking = rows[0];
    
    const pickupLocs = await db.select().from(locationsTable).where(eq(locationsTable.id, booking.pickupLocationId));
    const dropoffLocs = await db.select().from(locationsTable).where(eq(locationsTable.id, booking.dropoffLocationId));
    
    res.status(201).json(formatBooking(booking, car, pickupLocs[0], dropoffLocs[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to create booking");
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: err.issues });
      return;
    }
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = updateBookingSchema.parse(req.body);
    
    const existing = await db.select().from(bookingsTable).where(eq(bookingsTable.id, id));
    if (existing.length === 0) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    
    const updateData: any = { status: data.status };
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.customerName) updateData.customerName = data.customerName;
    if (data.customerEmail) updateData.customerEmail = data.customerEmail;
    if (data.customerPhone) updateData.customerPhone = data.customerPhone;
    if (data.pickupLocationId) updateData.pickupLocationId = data.pickupLocationId;
    if (data.dropoffLocationId) updateData.dropoffLocationId = data.dropoffLocationId;
    if (data.pickupDate) updateData.pickupDate = data.pickupDate;
    if (data.dropoffDate) updateData.dropoffDate = data.dropoffDate;
    
    const rows = await db.update(bookingsTable).set(updateData).where(eq(bookingsTable.id, id)).returning();
    const booking = rows[0];
    
    const cars = await db.select().from(carsTable).where(eq(carsTable.id, booking.carId));
    const pickupLocs = await db.select().from(locationsTable).where(eq(locationsTable.id, booking.pickupLocationId));
    const dropoffLocs = await db.select().from(locationsTable).where(eq(locationsTable.id, booking.dropoffLocationId));
    
    res.json(formatBooking(booking, cars[0], pickupLocs[0], dropoffLocs[0]));
  } catch (err) {
    req.log.error({ err }, "Failed to update booking");
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: err.issues });
      return;
    }
    res.status(500).json({ error: "Failed to update booking" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await db.delete(bookingsTable).where(eq(bookingsTable.id, id));
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete booking");
    res.status(500).json({ error: "Failed to delete booking" });
  }
});

export default router;
