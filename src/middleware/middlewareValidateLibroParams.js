import { libroParamsSchema } from "../validators/libroParamsSchema.js";

export const middlewareValidateLibroParams = (req, res, next) => {

    const { error, value } = libroParamsSchema.validate(req.params);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    req.params = value;
    next();

}