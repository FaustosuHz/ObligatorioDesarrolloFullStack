import { createLibroBodySchema } from "../validators/createLibroBodySchema.js";

export const middlewareValidateCreateLibroBody = (req, res, next) => {

    const { error, value } = createLibroBodySchema.validate(req.body, {
        abortEarly: false
    });

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    req.body = value;
    next();

}