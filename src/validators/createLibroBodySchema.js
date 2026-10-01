import Joi from "joi";

export const createLibroBodySchema = Joi.object({
    title: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            "string.empty": "El título es obligatorio",
            "string.min": "El título es obligatorio",
            "string.max": "El título no puede superar los 100 caracteres",
            "any.required": "El título es obligatorio"
        }),
    completed: Joi.boolean()
        .required()
        .messages({
            "boolean.base": "Completed debe ser verdadero o falso",
            "any.required": "Completed es obligatorio"
        }),
    categoryId: Joi.string()
        .hex()
        .length(24)
        .required()
        .messages({
            "string.empty": "La categoría es obligatoria",
            "string.hex": "El ID de la categoría no es válido",
            "string.length": "El ID de la categoría no es válido",
            "any.required": "La categoría es obligatoria"
        })
});