const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });

// 1. Index: Show Newest First + Category Filter
module.exports.index = async (req, res) => {
    const { category } = req.query; 
    let filter = {};
    if (category) filter = { category: category };

    // .sort({ _id: -1 }) moves the newest listings to the top left of the grid
    const allListings = await Listing.find(filter).sort({ _id: -1 });
    res.render("listings/index.ejs", { allListings, activeCategory: category });
};

// 2. Search Bar: Sorted by Newest
module.exports.searchBar = async (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) return res.redirect("/listings");

    const results = await Listing.find({
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { location: { $regex: searchTerm, $options: 'i' } },
            { country: { $regex: searchTerm, $options: 'i' } }
        ]
    }).sort({ _id: -1 });
    
    let message = results.length === 0 ? "No listings found!" : `${results.length} listings found!`;
    let messageType = results.length === 0 ? "error" : "success";

    res.render('listings/index.ejs', { 
        allListings: results, 
        searchMessage: message, 
        messageType: messageType,
        activeCategory: null 
    });
};

// 3. Create Listing (with Geocoding safety)
module.exports.createListing = async (req, res, next) => {
    let response = await geoCodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    }).send();

    if (!response.body.features.length) {
        req.flash("error", "Invalid location!");
        return res.redirect("/listings/new");
    }
    
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// 4. Show Listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

// 5. Render Forms
module.exports.renderNewForm = (req, res) => { res.render("listings/new.ejs"); };

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// 6. Update & Destroy
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (req.file) {
        listing.image = { url: req.file.path, filename: req.file.filename };
        await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListings = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};