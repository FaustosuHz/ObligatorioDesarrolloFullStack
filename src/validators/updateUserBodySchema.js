import Joi from 'joi';

export const updateUserBodySchema = Joi.object({

    name: Joi.string()
        .pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "El nombre es obligatorio",
            "string.min": "El nombre debe tener al menos 3 caracteres",
            "string.max": "El nombre no puede superar los 30 caracteres",
            "string.pattern.base": "El nombre solo puede contener letras y espacios"
        }),

    username: Joi.string()
        .alphanum()
        .min(3)
        .required()
        .messages({
            "string.empty": "El nombre de usuario es obligatorio",
            "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
            "string.alphanum": "El nombre de usuario solo puede contener letras y números"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.empty": "El email es obligatorio",
            "string.email": "El email no tiene un formato válido"
        })

});