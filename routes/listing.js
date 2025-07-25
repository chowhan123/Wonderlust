const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js"); // imported wrapAsync file
const { isLoggedIn, isOwner, validateListing, validateReview } = require("../middleware.js")

const ListingController = require("../controller/listing.js");

//below 2 pages used for Upload image from "multer package"
const multer  = require('multer')
const {storage} = require("../cloudConfig.js"); 
const upload = multer({ storage });

//search route
router.get("/search", wrapAsync(ListingController.searchBar));


router.route("/")
.get(wrapAsync(ListingController.index)) //Index Route
.post(isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(ListingController.createListing)); //Create newRoute


//New Route
router.get("/new", isLoggedIn, ListingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(ListingController.showListing)) //Show Route
.put(isLoggedIn,                               //Update Route
  isOwner,  //if user login and have permission to edit 
  upload.single("listing[image]"), //upload image
  validateListing,
  wrapAsync(ListingController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(ListingController.destroyListings)); //Delete Route


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(ListingController.renderEditForm));


module.exports = router;


