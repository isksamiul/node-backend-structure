const responseLib = require('../libs/responseLib');
const Joi = require('joi').extend(require('@joi/date'));

// Registration validation
const registrationValidate = async (req, res, next) => {
    try {
        const { error } = registrationValidateSchema.validate(req.body);
        if (error) {
            const apiResponse = responseLib.generate(true, error.details[0].message, null);
            return res.status(400).send(apiResponse);
        }
        next();
    } catch (err) {
        const apiResponse = responseLib.generate(true, `Validation Error: ${err.message}`, null);
        return res.status(400).send(apiResponse);
    }
};

const registrationValidateSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Mobile number must be 10 digits'
    }),
    password: Joi.string().min(6).required()
});

// Login validation
const loginValidate = async (req, res, next) => {
    try {
        const { error } = loginValidateSchema.validate(req.body);
        if (error) {
            const apiResponse = responseLib.generate(true, error.details[0].message, null);
            return res.status(400).send(apiResponse);
        }
        next();
    } catch (err) {
        const apiResponse = responseLib.generate(true, `Validation Error: ${err.message}`, null);
        return res.status(400).send(apiResponse);
    }
};

const loginValidateSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    registrationValidate,
    loginValidate
};
