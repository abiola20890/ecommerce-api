// utils/bcrypt.js
import bcrypt from "bcryptjs";

// Hash a plain text password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare a plain password with a hashed password
export const comparePassword = async (plainPassword, hashedPassword) => {
    return bcrypt.compare(plainPassword, hashedPassword);
};