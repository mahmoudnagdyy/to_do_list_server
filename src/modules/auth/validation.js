import joi from "joi";


export const signup = joi.object({
    name: joi.string().min(3).max(50).required(),
    username: joi.string().alphanum().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
})



export const login = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})