import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 2,
            maxLength: 100
        },
        price: {
            type: Number,
            required: true,
            min: 0,
            get: v => parseFloat((v / 100).toFixed(2)),
            set: v => Math.round(v * 100)
        },
        description: {
            type: String,
            trim: true,
            minLength: 10,
            maxLength: 1000
        },
        category: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 100
        },
        inStock: {
            type: Boolean,
            default: true
        },
        images: [
            {
                type: String,
                trim: true,
                match: [/^https?:\/\/.+/, "Each image must be a valid URL"]
            }
        ]
    },
    {
        timestamps: true,
        // Apply getters when converting to JSON and plain objects
        toJSON: { getters: true },
        toObject: { getters: true }
    }
);

// Text index for full-text search on name and description
productSchema.index({ name: "text", description: "text" });

// Index for category filter queries
productSchema.index({ category: 1 });

// Index for price range queries
productSchema.index({ price: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;