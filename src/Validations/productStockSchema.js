import Joi from 'joi';

export const stockSchema = Joi.object({
    inStock: Joi.boolean().required()
        .messages({
            "boolean.base": "inStock must be a boolean value",
            "any.required": "inStock field is required"
        })
});