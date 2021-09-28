import Joi from 'joi-browser';

export const schema = {
    username: Joi.string().required().email(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    forest_id: Joi.string().required(),
    password: Joi.string().required().min(8),
    phone: Joi.string().required().min(10)
};