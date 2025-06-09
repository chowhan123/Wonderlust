//logic for if code not in production USE "dotenv" package
if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js"); // this is imported code file for listing
const path = require("path"); // this import for ejs file
const methodOverride = require("method-override"); // used for overrind like    EX:?method=PUT
const ejsMate = require("ejs-mate"); // this package used for creating multiple templates or layouts
const ExpressError = require("./utils/ExpressError.js"); // this imported code file used for giving different response to differnt routes

//imported route files
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require('express-session'); //imported session

const MongoStore = require('connect-mongo'); // MongoStore for production deplayment storage
const flash = require("connect-flash"); // imported connect-flash for display messsages

//For generating password,username we imported below 2 packages
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user"); 


//This is mongoDB connection
//const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";
DbUrl = process.env.ATLASDB;

main()
.then(() => { console.log("Connected to DB")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(DbUrl);
}

// //This code for created ejs file
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // this sets the correct path
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);  // use ejs-locals for all ejs templates:
app.use(express.static(path.join(__dirname,"/public"))); // used for serving static file to all pages website Ex:styling,js code logic,image etc

//Store the user data upto 24hrs in Mongo-DB
const store = MongoStore.create({
  mongoUrl: DbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600
});

store.on("error", () => {
  console.log("ERROR ON MONGO SESSION STORE",err);
});

//session code used for track which websites we use more
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
};

app.use(session(sessionOptions));
app.use(flash());

//we write [password code] after session
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());    // "USERS" information store is called serializeUser
passport.deserializeUser(User.deserializeUser()); // "USERS" information not store is called deserializeUser


//this Middleware "success code" used in boilerplate.ejs file to display msg='listing created; to clients
app.use( (req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// Catch-all for unmatched routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

// Central error-handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", {message} );
});


//Running website on PORT 8080
app.listen(8080,() => {
  console.log("server running on port 8080");
});
