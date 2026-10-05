import { librosQuerySchema } from "../validators/librosQuerySchema.js";

export const middlewareValidateLibroQuery = (req, res, next) => {
    const { error, value } = librosQuerySchema.validate(req.query, { convert: true });

    if (error) {
        const err = new Error(error.details[0].message);
        err.status = 400;
        return next(err);
    }

    res.locals.validatedQuery = value;
    next();
};