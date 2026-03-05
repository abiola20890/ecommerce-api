import "dotenv/config";
import mongoose from "mongoose";
import app from "./src/app.js";

const PORT = process.env.PORT || 4007;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
        });
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

startServer();

// ─── Handle Unhandled Promise Rejections ──────────────────────────────────────
process.on("unhandledRejection", (error) => {
    console.error(`Unhandled Rejection: ${error.message}`);
    process.exit(1);
});

// ─── Handle Uncaught Exceptions ───────────────────────────────────────────────
process.on("uncaughtException", (error) => {
    console.error(`Uncaught Exception: ${error.message}`);
    process.exit(1);
});