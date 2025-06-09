
const Listing = require("./models/listing");
const Review = require("./models/reviews.js");
const ExpressError = require("./utils/ExpressError.js"); // this imported code file used for giving different response to differnt routes
const {listingSchema,reviewSchema} = require("./Schema.js");  // this imported Schema for "SERVER SIDE"

// this middleware code for login or not
module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;  // this code redirect to newlisting page
      req.flash("error","you must be logged into create listing!");
      return res.redirect("/login");
    }
    next();
  }

// this middleware code used for redirecturl to new listing page
module.exports.saveRedirectUrl = (req,res,next) => {
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

//this below code for  "listing.owner.id != currUser.id" show error
module.exports.isOwner = async (req,res,next) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","You are not user of Listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

//this below code for REVIEWS are delete by How created reviews
module.exports.isReviewAuthor = async (req,res,next) => {
  let {id,reviewId} = req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.currUser._id)){
    req.flash("error","You are not author of Review!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}


//Middleware code for "Server Side" Errors to handle "LISTING page"
module.exports.validateListing = (req,res,next) => {
  let {error} = listingSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg)
  } else {
    next();
  }
}

//Middleware code for "Server Side" Errors to handle "REVIEW form"
module.exports.validateReview = (req,res,next) => {
  let {error} = reviewSchema.validate(req.body);
  if(error){
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg)
  } else {
    next();
  }
}


