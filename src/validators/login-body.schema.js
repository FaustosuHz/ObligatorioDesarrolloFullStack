import Joi from 'joi';

export const loginBodySchema = Joi.object({

    password: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            "string.empty": "La contraseña es obligatoria",
            "string.min": "La contraseña debe tener al menos 3 caracteres",
            "string.max": "La contraseña no puede superar los 30 caracteres"
        }),

    identificador: Joi.alternatives().try(

        Joi.string().email(),

        Joi.string().alphanum().min(3)

    ).required().messages({
        "any.required": "El email o nombre de usuario es obligatorio",
        "alternatives.match": "Debe ingresar un email o un nombre de usuario válido"
    })

});