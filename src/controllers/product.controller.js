import { checkValidId, checkFound } from "../utils/handleError.js";
import { buildQuery, buildSort } from "../utils/queryHelper.js";
import * as productService from "../services/product.service.js";
import { getPagination } from "../utils/pagination.js";
import Subscriber from "../models/subscriber.model.js";
import { sendEmail } from "../services/emailService.js";


// CREATE a new product and notify subscribers
const createProduct = async (req, res, next) => {
    try {
        const newProduct = await productService.createProductService(req.body);

        // Notify subscribers asynchronously — don't block the response
        notifySubscribers(newProduct).catch(err =>
            console.error(`Failed to notify subscribers: ${err.message}`)
        );

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        console.error(`Error creating product: ${error.message}`);
        next(error);
    }
};

// Fire-and-forget subscriber notification — runs after response is sent
const notifySubscribers = async (product) => {
    const subscribers = await Subscriber.find({}, "email").lean();
    if (!subscribers.length) return;

    const emailPromises = subscribers.map(sub =>
        sendEmail(sub.email, "New Product Available!", {
            text: `Check out our new product: ${product.name}`,
            html: `<p>Check out our new product: <strong>${product.name}</strong></p>`
        })
    );

    await Promise.allSettled(emailPromises);
};


// GET single product by ID
const getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        checkValidId(id);
        const product = await productService.getProductByIdService(id);
        checkFound(product, `Product with ID ${id} not found`);
        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product
        });
    } catch (error) {
        console.error(`Error retrieving product: ${error.message}`);
        next(error);
    }
};

// UPDATE a product by ID
const updateProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        checkValidId(id);
        const updatedProduct = await productService.updateProductByIdService(id, req.body);
        checkFound(updatedProduct, `Product with ID ${id} not found`);
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.error(`Error updating product: ${error.message}`);
        next(error);
    }
};

// DELETE a product by ID — returns 204 No Content
const deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        checkValidId(id);
        const deletedProduct = await productService.deleteProductByIdService(id);
        checkFound(deletedProduct, `Product with ID ${id} not found`);
        return res.status(204).send();
    } catch (error) {
        console.error(`Error deleting product: ${error.message}`);
        next(error);
    }
};

// GET all products with pagination, filtering, sorting, and search
const getAllProducts = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 10,
            q,
            category,
            minPrice,
            maxPrice,
            name,
            sortBy = "createdAt",
            order = "desc"
        } = req.query;

        const { pageNum, limitNum, skip } = getPagination(page, limit);
        const filter = buildQuery({ q, category, minPrice, maxPrice, name });
        const sortOption = buildSort(sortBy, order);

        const [products, totalProducts] = await Promise.all([
            productService.getAllProductsService(filter, sortOption, skip, limitNum),
            productService.countProductsService(filter)
        ]);

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
            pagination: {
                page: pageNum,
                limit: limitNum,
                totalProducts,
                totalPages: Math.ceil(totalProducts / limitNum)
            }
        });
    } catch (error) {
        console.error(`Error retrieving products: ${error.message}`);
        next(error);
    }
};

// UPDATE stock status of a product by ID
const updateStockStatusById = async (req, res, next) => {
    const { id } = req.params;
    const { inStock } = req.body;
    try {
        checkValidId(id);
        const updatedProduct = await productService.updateProductByIdService(id, { inStock });
        checkFound(updatedProduct, `Product with ID ${id} not found`);
        return res.status(200).json({
            success: true,
            message: "Product stock status updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.error(`Error updating product stock status: ${error.message}`);
        next(error);
    }
};


export {
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProducts,
    updateStockStatusById
};