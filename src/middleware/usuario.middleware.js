import { userSchema } from "../validatorsusuario.schema.js";



const middlewareBodyUser = (req, res, next) => {
    const body = req.body;
    const { error, value } = userSchema.validate(body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    console.log('body', body)
    console.log('value', value)
    req.body = value;
    next();
}

export default middlewareBodyUser;
