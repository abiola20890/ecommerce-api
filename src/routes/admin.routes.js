// routes/admin.routes.js
import express from "express";
import { sendPromotion } from "../controllers/admin.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect, adminOnly);

// POST /api/admin/promotions — send promotional email to all subscribers
router.post("/promotions", sendPromotion);

export default router;