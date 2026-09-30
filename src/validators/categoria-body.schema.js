import Joi from "joi";

export const categoriaBodySchema = Joi.object({

    name: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "El nombre de la categoría es obligatorio",
            "string.min": "El nombre de la categoría debe tener al menos 3 caracteres",
            "string.max": "El nombre de la categoría no puede superar los 30 caracteres"
        })

});