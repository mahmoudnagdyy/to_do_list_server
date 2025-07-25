import Joi from "joi";


export const addTask = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    description: Joi.string().min(5),
}).required()