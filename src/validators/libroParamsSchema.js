import Joi from "joi";

export const libroParamsSchema = Joi.object({
    idLibro: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.empty": "El ID del libro es obligatorio",
            "string.hex": "El ID del libro no es válido",
            "string.length": "El ID del libro no es válido",
            "any.required": "El ID del libro es obligatorio"
        })
});