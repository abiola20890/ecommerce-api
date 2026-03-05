
export const validateRequest = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map(detail => detail.message)
        });
    }
    req.body = value;
    next();
};