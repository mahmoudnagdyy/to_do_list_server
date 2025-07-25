import Joi from "joi";


export const updateProfile = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    username: Joi.string().alphanum().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
}).required()


export const forgetPassword = Joi.object({
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required()
}).required()