



export const validation = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body, {abortEarly: false})
        if(validationResult.error){
            return res.send({message: 'Validation Error', err: validationResult.error.details})
        }
        next()
    }
}