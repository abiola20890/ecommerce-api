// routes/subscriber.routes.js
import express from "express";
import { subscribeUser } from "../controllers/subscriber.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";
import { getSubscribers } from "../controllers/admin.controller.js";

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────
// POST /api/subscribers — anyone can subscribe
router.post("/", subscribeUser);

// ─── Admin Only Routes ────────────────────────────────────────────────────────
router.use(protect, adminOnly);

// GET /api/subscribers — only admin can view all subscribers
router.get("/", getSubscribers);

export default router;