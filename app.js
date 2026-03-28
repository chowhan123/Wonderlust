if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate"); 
const ExpressError = require("./utils/ExpressError.js"); 
const session = require('express-session'); 
const MongoStore = require('connect-mongo'); 
const flash = require("connect-flash"); 
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user"); 
const helmet = require("helmet");

// Import Routes
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const bookingRouter = require("./routes/booking.js");

// DATABASE CONNECTION
const DbUrl = process.env.ATLASDB || "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => { console.log("Connected to MongoDB Atlas") })
    .catch(err => console.log("DB Connection Error:", err));

async function main() {
    await mongoose.connect(DbUrl);
}

// VIEW ENGINE & MIDDLEWARE
app.engine('ejs', ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// --- IMPORTANT: TRUST PROXY ---
// This allows cookies to work on Render/HTTPS
app.set("trust proxy", 1);

// SESSION STORAGE
const store = MongoStore.create({
    mongoUrl: DbUrl,
    crypto: {
      secret: process.env.SECRET || "fallbacksecret",
    },
    touchAfter: 24 * 3600
});

const sessionOptions = {
    store,
    secret: process.env.SECRET || "fallbacksecret",
    resave: false,
    saveUninitialized: false, // Better for Passport to prevent empty sessions
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Works now because of trust proxy
        sameSite: 'lax'
    }
};

app.use(session(sessionOptions));
app.use(flash());

// --- CONTENT SECURITY POLICY (CSP) FIXED ---
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://js.stripe.com",
    "https://checkout.stripe.com",
    "https://wonderlust-ffz4.onrender.com",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
    "https://cdnjs.cloudflare.com/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    "https://js.stripe.com",
    "https://checkout.stripe.com",
    "https://cdn.jsdelivr.net",
    "https://wonderlust-ffz4.onrender.com",
];
const fontSrcUrls = [
    "https://fonts.gstatic.com/", 
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net"
];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dcnkefctm/",
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
            frameSrc: ["'self'", "https://js.stripe.com", "https://checkout.stripe.com"],
        },
    })
);

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// GLOBAL RES.LOCALS
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// ROUTES
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/listings/:id/bookings", bookingRouter);

app.get('/', (req, res) => {
    res.redirect('/listings');
});

// ERROR HANDLING
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
});

// PORT
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});