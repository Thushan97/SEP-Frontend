import Joi from 'joi-browser';

export const schema = {
    oldUsername: Joi.string().required().email(),
    username: Joi.string().required().email(),
    forest_name: Joi.string().required(),
};