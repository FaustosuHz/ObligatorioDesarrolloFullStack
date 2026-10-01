import { categoriaParamsSchema } from "../validators/categoriaParamsSchema.js";

export const middlewareValidateCategoriaParams = (req, res, next) => {

    const { error, value } = categoriaParamsSchema.validate(req.params);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    req.params = value;
    next();

}