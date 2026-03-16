// routes/product.routes.js
import express from "express";
import {
    createProduct, getProductById, updateProductById,
    deleteProductById, getAllProducts, updateStockStatusById
} from "../controllers/product.controller.js";
import {
    validateCreateProduct, validateUpdateProduct,
    validateUpdateProductBody, validateUpdateStock, validateProductId
} from "../validations/product.validation.js"
import { addImagesToProductById, removeImageFromProductById } from "../controllers/productImage.controller.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

// ─── Public Routes ────────────────────────────────────────────────────────────
router.get("/", getAllProducts);
router.get("/:id", validateProductId, getProductById);

// ─── Admin Only Routes ────────────────────────────────────────────────────────
router.use(protect, adminOnly);

router.post("/", validateCreateProduct, createProduct);
router.put("/:id", validateProductId, validateUpdateProductBody, validateUpdateProduct, updateProductById);
router.delete("/:id", validateProductId, deleteProductById);
router.patch("/:id/stock", validateProductId, validateUpdateStock, updateStockStatusById);
router.post("/:id/images", validateProductId, addImagesToProductById);
router.delete("/:id/images", validateProductId, removeImageFromProductById);

export default router;