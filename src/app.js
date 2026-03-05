import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import subscriberRoutes from "./routes/subscriber.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errorHandler, { notFound } from "./middleware/errorHandler.js";
import logger from "./middleware/logger.js";

const app = express();

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── CORS ─────────────────────────────────────────────────────────────────────
app.use(cors());

// ─── Logger ───────────────────────────────────────────────────────────────────
app.use(logger);

// ─── Welcome Route ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the E-commerce Catalog API" });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/admin", adminRoutes);

// ─── Error Handling — always last ─────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;