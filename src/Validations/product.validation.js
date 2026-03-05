import Joi from "joi";
import mongoose from "mongoose";
import { stockSchema } from "./productStockSchema.js";
import { normalizeCategory } from "../utils/categoryHelper.js";
import { validateRequest } from "../utils/validateRequest.js";


const baseProductSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100)
        .messages({
            "string.empty": "Product name is required",
            "string.min": "Product name must be at least 2 characters",
            "string.max": "Product name cannot exceed 100 characters"
        }),

    description: Joi.string().trim().min(10).max(1000),

    price: Joi.number().positive().precision(2),

    category: Joi.string().trim().lowercase()
        .custom((value, helpers) => {
            const normalized = normalizeCategory(value);
            if (!normalized) {
                return helpers.message("Invalid category value");
            }
            return normalized;
        }),

    inStock: Joi.boolean(),

    images: Joi.array()
        .items(Joi.string().uri())
        .min(1)
        .max(10)


}).options({ abortEarly: false });


export const createProductSchema = baseProductSchema.fork(
    ["name", "description", "price", "category", "inStock", "images"],
    field => field.required()
);


export const updateProductSchema = baseProductSchema;


// CREATE PRODUCT VALIDATION
export const validateCreateProduct = validateRequest(createProductSchema);

// UPDATE PRODUCT VALIDATION — empty-body guard is composable in the router
export const validateUpdateProductBody = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Update payload cannot be empty"
        });
    }
    next();
};

export const validateUpdateProduct = validateRequest(updateProductSchema);

// UPDATE STOCK VALIDATION
export const validateUpdateStock = validateRequest(stockSchema);


// VALIDATE PRODUCT ID
export const validateProductId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID"
        });
    }
    next();
};