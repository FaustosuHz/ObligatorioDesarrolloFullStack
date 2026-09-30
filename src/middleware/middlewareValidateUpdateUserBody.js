import { updateUserBodySchema } from "../validators/updateUserBodySchema.js";

export const middlewareValidateUpdateUserBody = (req, res, next) => {

    const { error, value } = updateUserBodySchema.validate(req.body, {
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