import Joi from 'joi';

export const libroSchema = Joi.object({

    userId: Joi.number().integer().positive().required(),

    title: Joi.string().min(3).max(50).required(),

    completed: Joi.boolean().default(false)

});