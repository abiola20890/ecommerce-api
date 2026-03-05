import { checkValidId, checkFound } from "../utils/handleError.js";
import * as productService from "../services/product.service.js";


// ADD images to a product by ID
const addImagesToProductById = async (req, res, next) => {
    const { id } = req.params;
    const { images } = req.body;
    try {
        if (!Array.isArray(images) || images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "images must be a non-empty array"
            });
        }

        checkValidId(id);
        const updatedProduct = await productService.addImagesToProductService(id, images);
        checkFound(updatedProduct, `Product with ID ${id} not found`);

        return res.status(200).json({
            success: true,
            message: "Images added to product successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.error(`Error adding images to product: ${error.message}`);
        next(error);
    }
};


// REMOVE images from a product by ID
const removeImageFromProductById = async (req, res, next) => {
    const { id } = req.params;
    const { images } = req.body;
    try {
        if (!Array.isArray(images) || images.length === 0) {
            return res.status(400).json({
                success: false,
                message: "images must be a non-empty array"
            });
        }

        checkValidId(id);
        const updatedProduct = await productService.removeImagesFromProductService(id, images);
        checkFound(updatedProduct, `Product with ID ${id} not found`);

        return res.status(200).json({
            success: true,
            message: "Images removed from product successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.error(`Error removing images from product: ${error.message}`);
        next(error);
    }
};


export {
    addImagesToProductById,
    removeImageFromProductById
};