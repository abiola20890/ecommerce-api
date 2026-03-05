import mongoose from "mongoose";

// CENTRALIZED ERROR HANDLER MIDDLEWARE
const errorHandler = (err, req, res, next) => {

    // Default error
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    let success = false;

    // Mongoose invalid ObjectId — e.g. checkValidId throws this
    if (err instanceof mongoose.Error.CastError) {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Mongoose validation error — e.g. schema validators failed
    if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400;
        message = Object.values(err.errors)
            .map(e => e.message)
            .join(", ");
    }

    // MongoDB duplicate key — e.g. duplicate email on subscriber
    if (err.code === 11000) {
        statusCode = 409;
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
    }

    // Joi validation error — e.g. from validateRequest middleware
    if (err.isJoi) {
        statusCode = 400;
        message = err.details.map(d => d.message).join(", ");
    }

    // Log server errors only (not 4xx client errors)
    if (statusCode >= 500) {
        console.error(`[${req.method}] ${req.path} — ${err.message}`);
    }

    return res.status(statusCode).json({
        success,
        message,
        // Show stack trace only in development
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
};

// 404 HANDLER — for routes that don't exist
export const notFound = (req, res, next) => {
    const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};

export default errorHandler;