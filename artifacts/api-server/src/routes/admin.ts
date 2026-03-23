import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { bookingsTable, carsTable, locationsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats", async (req, res) => {
  try {
    const cars = await db.select().from(carsTable);
    const bookings = await db.select().from(bookingsTable);
    const allCars = await db.select().from(carsTable);
    const allLocations = await db.select().from(locationsTable);
    
    const carMap = new Map(allCars.map(c => [c.id, c]));
    const locationMap = new Map(allLocations.map(l => [l.id, l]));
    
    const totalCars = cars.length;
    const availableCars = cars.filter(c => c.available).length;
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === "pending").length;
    const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
    const completedBookings = bookings.filter(b => b.status === "completed").length;
    const cancelledBookings = bookings.filter(b => b.status === "cancelled").length;
    const totalRevenue = bookings
      .filter(b => b.status !== "cancelled")
      .reduce((sum, b) => sum + Number(b.totalPrice), 0);
    
    const recentBookings = bookings
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
      .map(b => {
        const car = carMap.get(b.carId);
        const pickupLoc = locationMap.get(b.pickupLocationId);
        const dropoffLoc = locationMap.get(b.dropoffLocationId);
        return {
          ...b,
          totalPrice: Number(b.totalPrice),
          car: car ? {
            ...car,
            pricePerDay: Number(car.pricePerDay),
            features: car.features || [],
            imageUrl: car.imageUrl || null,
            description: car.description || null,
            createdAt: car.createdAt.toISOString(),
          } : null,
          pickupLocation: pickupLoc || null,
          dropoffLocation: dropoffLoc || null,
          createdAt: b.createdAt.toISOString(),
          notes: b.notes || null,
        };
      });
    
    res.json({
      totalCars,
      availableCars,
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalRevenue,
      recentBookings,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get admin stats");
    res.status(500).json({ error: "Failed to get admin stats" });
  }
});

export default router;
