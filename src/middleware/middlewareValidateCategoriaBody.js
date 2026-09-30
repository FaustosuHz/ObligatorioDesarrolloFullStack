import { categoriaBodySchema } from "../validators/categoria-body.schema.js";

export const middlewareValidateCategoriaBody = (req, res, next) => {

    const { error, value } = categoriaBodySchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    req.body = value;

    next();

};