import { libroSchema } from "../validations/libro.schema.js";

const middlewareBodyLibro = (req, res, next) => {

    const body = req.body;

    const { error, value } = libroSchema.validate(body, { abortEarly: false });

    if (error) {

        return res.status(400).json({
            error: error.details[0].message
        });
    }

    console.log('body', body);

    console.log('value', value);

    req.body = value;

    next();
}

export default middlewareBodyLibro;