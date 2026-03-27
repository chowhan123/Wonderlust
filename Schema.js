const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0), // Price value not negative
        country: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().allow("", null), // Image can be empty or null
        
        // ADDED CATEGORY VALIDATION HERE
        category: Joi.string().valid(
            "Trending", 
            "Rooms", 
            "Iconic cities", 
            "Mountain", 
            "Castles", 
            "Amazing pools", 
            "Camping", 
            "Arctic", 
            "Beachfront", 
            "Deserts", 
            "Farms"
        ).required()
    }).required(),
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});