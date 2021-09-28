import Joi from 'joi-browser';

export const schema = {
    username: Joi.string().required().email(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().min(10).required()
};