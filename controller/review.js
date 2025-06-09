const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.createReview = (async (req,res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;  //when create new review we store author
  console.log(newReview);
  listing.reviews.push(newReview);

  await newReview.save();
 // await listing.save();
 await listing.save({ validateBeforeSave: false });

  req.flash("success","New Review Created!");
  res.redirect(`/listings/${listing._id}`);
});

module.exports.destroyReview = (async (req,res) => {
  let {id,reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});  //delete review from listing array
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","Review Deleted!");
  res.redirect(`/listings/${id}`);
});

