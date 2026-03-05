import productModel from "../models/product.model.js";


export const createProductService = (data) => {
    return productModel.create(data);
};

export const getProductByIdService = (id) => {
    // lean() returns a plain JS object — faster for read-only responses
    return productModel.findById(id).lean();
};

export const updateProductByIdService = (id, data) => {
    // $set makes partial updates explicit and avoids accidental field conflicts
    return productModel.findByIdAndUpdate(
        id,
        { $set: data },
        { new: true, runValidators: true }
    );
};

export const deleteProductByIdService = (id) => {
    return productModel.findByIdAndDelete(id);
};

export const getAllProductsService = (filter, sortOption, skip, limit) => {
    // lean() for performance on list queries
    return productModel.find(filter).sort(sortOption).skip(skip).limit(limit).lean();
};

export const countProductsService = (filter) => {
    // Use estimatedDocumentCount when no filter — avoids full collection scan
    const hasFilter = Object.keys(filter).length > 0;
    return hasFilter
        ? productModel.countDocuments(filter)
        : productModel.estimatedDocumentCount();
};

export const addImagesToProductService = (id, images) => {
    return productModel.findByIdAndUpdate(
        id,
        { $push: { images: { $each: images } } },
        { new: true, runValidators: true }
    );
};

export const removeImagesFromProductService = (id, images) => {
    return productModel.findByIdAndUpdate(
        id,
        { $pull: { images: { $in: images } } },
        { new: true, runValidators: true }
    );
};