const Joi = require('joi');

const listingSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    image: Joi.object({
        url: Joi.string().uri(), // URL validation
        filename: Joi.string()  // Filename validation
    }),
});

const reviewSchema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().allow('', null).max(500) // Allow empty or null, limit maximum length
});

module.exports = {
    listingSchema,
    reviewSchema
};
