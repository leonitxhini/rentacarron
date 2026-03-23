import { Router, type IRouter } from "express";
import healthRouter from "./health";
import carsRouter from "./cars";
import locationsRouter from "./locations";
import bookingsRouter from "./bookings";
import adminRouter from "./admin";
import uploadRouter from "./upload";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/cars", carsRouter);
router.use("/locations", locationsRouter);
router.use("/bookings", bookingsRouter);
router.use("/admin", adminRouter);
router.use(uploadRouter);

export default router;
