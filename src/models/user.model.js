// models/user.model.js
import mongoose from "mongoose";
import { hashPassword, comparePassword } from "../utils/bcrypt.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 2,
            maxLength: 100
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
            select: false
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await hashPassword(this.password);
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return comparePassword(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;