import Joi from "joi";
import { validateRequest } from "../utils/validateRequest.js";

const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
        .messages({
            "string.empty": "Name is required",
            "string.min": "Name must be at least 2 characters",
            "string.max": "Name cannot exceed 100 characters"
        }),

    email: Joi.string().trim().email().lowercase().required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address"
        }),

    password: Joi.string().min(6).max(50).required()
        .messages({
            "string.empty": "Password is required",
            "string.min": "Password must be at least 6 characters",
            "string.max": "Password cannot exceed 50 characters"
        }),

    role: Joi.string().valid("user", "admin").default("user")

}).options({ abortEarly: false });


const loginSchema = Joi.object({
    email: Joi.string().trim().email().lowercase().required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Please provide a valid email address"
        }),

    password: Joi.string().required()
        .messages({
            "string.empty": "Password is required"
        })

}).options({ abortEarly: false });


export const validateRegister = validateRequest(registerSchema);
export const validateLogin = validateRequest(loginSchema);