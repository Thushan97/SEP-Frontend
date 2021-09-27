import Joi from 'joi-browser';

export const schema = {
    username: Joi.string().required().email(),
    forest_name: Joi.string().required(),
};