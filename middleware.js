const Listing = require("./models/listing");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./Schema.js");

// 1. Check if User is Logged In
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // Store the URL the user was trying to access
        req.session.redirectUrl = req.originalUrl; 
        req.flash("error", "You must be logged in to make changes!");
        return res.redirect("/login");
    }
    next();
};

// 2. Save Redirect URL for Passport
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// 3. Check if current user is the Listing Owner
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    if (!listing) {
        req.flash("error", "Listing you are looking for does not exist!");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "Permission denied. You do not own this listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// 4. Check if current user is the Review Author
module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);

    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// 5. Joi Validation for Listings (Server Side)
module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};

// 6. Joi Validation for Reviews (Server Side)
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};