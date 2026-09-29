import { updatePlanBodySchema } from "../validators/updatePlanBody.schema.js";

export const middlewareValidatePlanBody = (req, res, next) => {

    const { error, value } = updatePlanBodySchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    req.body = value;

    next();

};