export const velidateRequired = (schema, reqKey) => {
    return (req, res, next) => {
        const objetoAValidar = req[reqKey];
        const { error, value } = schema.validate(objetoAValidar, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                error: error.details[0].message
            });
        }
        req[reqKey] = value;
        next();
    }
}





