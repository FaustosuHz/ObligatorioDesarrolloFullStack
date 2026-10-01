import Joi from "joi";

export const categoriaParamsSchema = Joi.object({
    categoryId: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.empty": "El ID de la categoría es obligatorio",
            "string.hex": "El ID de la categoría no es válido",
            "string.length": "El ID de la categoría no es válido",
            "any.required": "El ID de la categoría es obligatorio"
        })
});