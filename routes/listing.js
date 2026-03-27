const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const ListingController = require("../controller/listing.js");
const Booking = require("../models/booking.js"); // Ensure this model exists
const Listing = require("../models/listing.js");

// Image Upload Configuration
const multer = require('multer');
const { storage } = require("../cloudConfig.js"); 
const upload = multer({ storage });

// --- SEARCH ROUTE ---
router.get("/search", wrapAsync(ListingController.searchBar));

// --- INDEX & CREATE ROUTE ---
router
  .route("/")
  .get(wrapAsync(ListingController.index)) 
  .post(
    isLoggedIn, 
    upload.single("listing[image]"), 
    validateListing, 
    wrapAsync(ListingController.createListing)
  );

// --- NEW LISTING FORM ---
router.get("/new", isLoggedIn, ListingController.renderNewForm);

// --- BOOKING ROUTE (The missing piece) ---
router.post(
  "/:id/book", 
  isLoggedIn, 
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { checkIn, checkOut } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    // Convert strings to Date objects
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    
    // Calculate difference in days
    const timeDiff = d2.getTime() - d1.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (days <= 0) {
      req.flash("error", "Check-out date must be after Check-in date!");
      return res.redirect(`/listings/${id}`);
    }

    const totalPrice = days * listing.price;

    const newBooking = new Booking({
      listing: id,
      user: req.user._id,
      checkIn: d1,
      checkOut: d2,
      totalPrice: totalPrice
    });

    await newBooking.save();
    req.flash("success", "Reservation confirmed! Enjoy your trip.");
    res.redirect("/profile");
  })
);

// --- SHOW, UPDATE & DELETE ROUTES ---
router
  .route("/:id")
  .get(wrapAsync(ListingController.showListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(ListingController.updateListing)
  )
  .delete(
    isLoggedIn, 
    isOwner, 
    wrapAsync(ListingController.destroyListings)
  );

// --- EDIT LISTING FORM ---
router.get(
  "/:id/edit", 
  isLoggedIn, 
  isOwner, 
  wrapAsync(ListingController.renderEditForm)
);

module.exports = router;