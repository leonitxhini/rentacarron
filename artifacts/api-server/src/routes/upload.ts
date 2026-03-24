import { Router, type IRouter, type RequestHandler } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router: IRouter = Router();

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? "admin123";

const requireAdmin: RequestHandler = (req, res, next) => {
  const auth = req.headers["authorization"] ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token || token !== ADMIN_SECRET) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
};

const publicDir = path.resolve(process.cwd(), "public");
const uploadDir = path.join(publicDir, "images", "cars");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `car-${Date.now()}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"));
  },
});

router.post("/upload/car-image", requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No image file provided" });
    return;
  }
  const relativePath = `/images/cars/${req.file.filename}`;
  res.json({ url: relativePath });
});

export default router;
