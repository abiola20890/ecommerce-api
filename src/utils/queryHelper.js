const buildQuery = ({ q, category, minPrice, maxPrice, name }) => {
    const filter = {};
    if (q) filter.$text = { $search: q };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = parseInt(minPrice) * 100;
        if (maxPrice) filter.price.$lte = parseInt(maxPrice) * 100;
    }
    if (name) filter.name = { $regex: name, $options: "i" };
    return filter;
};

const buildSort = (sortBy, order) => {
    const sortOrder = order === "asc" ? 1 : -1;
    const sortField = ["price", "name", "createdAt"].includes(sortBy) ? sortBy : "createdAt";
    return { [sortField]: sortOrder };
};

export { buildQuery, buildSort };