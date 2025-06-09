
const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js"); // imported wrapAsync file
const ExpressError = require("../utils/ExpressError.js"); // this imported code file used for giving different response to differnt routes
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controller/review.js");

//POST review route
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));

//Delete review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;

