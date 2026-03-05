import { isValidObjectId } from "mongoose";

export const checkValidId = (id) => {
    if (!isValidObjectId(id)) {
        const error = new Error("Invalid ID");
        error.statusCode = 400;
        throw error;
    }
};

export const checkFound = (item, message) => {
    if (!item) {
        const error = new Error(message);
        error.statusCode = 404;
        throw error;
    }
};