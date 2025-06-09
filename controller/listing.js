
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geoCodingClient = mbxGeocoding({ accessToken: mapToken });


//Search Bar logic
module.exports.searchBar = async (req, res) => {
  const searchTerm = req.query.q;
  const results = await Listing.find({
    $or: [
      { title: { $regex: searchTerm, $options: 'i' } },
      { location: { $regex: searchTerm, $options: 'i' } }
    ]
  });
  
  if (results.length === 0) {
    message = "No listings found for your search!";
    messageType = "error";
  } else {
    message = `${results.length} listings found for your search!`;
    messageType = "success";
  }

res.render('listings/index', { 
  allListings: results, 
  searchMessage: message, 
  messageType: messageType
});
};


//Rendering indexForm to listing Page
module.exports.index = async (req,res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs",{allListings});
}

//Rendering Newform lo listings page
module.exports.renderNewForm = (req,res) => {
  res.render("listings/new.ejs");
}

//Rendering ShowForm to listings Page
module.exports.showListing = (async (req,res) => {
    let{id} = req.params;
    const listing = await Listing.findById(id)
    .populate({
      path: "reviews", populate: { path: "author"}
    })
    .populate("owner"); //populate means show inforamtion of owner and reviews

    if(!listing){
      req.flash("error","Listing you requested does not exist!");
      res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
});

//Create listing page 
module.exports.createListing = (async (req,res,next) => {
  let response = await geoCodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
  .send();
  
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;      //this line store currUserId when we create listing
  newListing.image =  {url,filename} ;

  newListing.geometry = {
    type: "Point",
    coordinates: response.body.features[0].geometry.coordinates,
  }

  let savedListing = await newListing.save();
  console.log(savedListing);

  req.flash("success","New Listing Created!");
  res.redirect("/listings");
});

//render editform to All listing page
module.exports.renderEditForm = (async(req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Listing you requested does not exist!");
      res.redirect("/listings");
    }
    //changing image-size 
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{ listing, originalImageUrl });
});

//Update New Listing Page
module.exports.updateListing = (async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});

    //image upload while editing form code
    if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = {url,filename},
      await listing.save();
    } 
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
});

//Delete New Listing Page
module.exports.destroyListings = (async (req,res)=> {
    let {id} = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
});

