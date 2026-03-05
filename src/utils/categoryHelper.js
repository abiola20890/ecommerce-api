export const normalizeCategory = (value) => {
    if (!value) return null;
    return value
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};