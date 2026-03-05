// controllers/auth.controller.js
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
};

// REGISTER
export const register = async (req, res, next) => {
    console.log("register hit");
    console.log("next type:", typeof next);
    const { name, email, password, role } = req.body;
    try {
        console.log("trying to create user...");
        const existingUser = await User.findOne({ email });
        console.log("existingUser check done");
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already in use"
            });
        }

        const user = await User.create({ name, email, password, role });
        console.log("user created");
        const token = generateToken(user._id, user.role);

        return res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(`Error registering user: ${error.message}`);
        console.error(`Error stack: ${error.stack}`);
        next(error);
    }
};

// LOGIN
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Explicitly select password since select: false
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user._id, user.role);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error(`Error logging in user: ${error.message}`);
        next(error);
    }
};

// GET CURRENT USER
export const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user
        });
    } catch (error) {
        console.error(`Error getting user: ${error.message}`);
        next(error);
    }
};