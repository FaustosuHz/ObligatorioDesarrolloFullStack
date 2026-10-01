import { updateLibroBodySchema } from "../validators/updateLibroBodySchema.js";

export const middlewareValidateUpdateLibroBody = (req, res, next) => {

    const { error, value } = updateLibroBodySchema.validate(req.body, {
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