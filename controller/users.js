const User = require("../models/user");
const Listing = require("../models/listing");
const Booking = require("../models/booking");
const { cloudinary } = require("../cloudConfig");

// Render signupForm
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Signup logic
module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });

        if (req.file) {
            newUser.avatar = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        let registeredUser = await User.register(newUser, password);
        
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            return res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect("/signup"); 
    }
};

// Render loginForm
module.exports.loginForm = (req, res) => {
    res.render("users/login.ejs");
};

// Login logic
module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    res.redirect(res.locals.redirectUrl || "/listings");
};

// Logout logic
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.flash("success", "You are logged out!");
        return res.redirect("/listings");
    } );
};

// Render Profile Dashboard (Traveler View)
module.exports.renderProfile = async (req, res) => {
    try {
        const userListings = await Listing.find({ owner: req.user._id });
        const userBookings = await Booking.find({ user: req.user._id })
            .populate("listing")
            .sort({ createdAt: -1 });

        res.render("users/profile.ejs", { userListings, userBookings });
    } catch (e) {
        console.error(e);
        req.flash("error", "Could not load profile dashboard.");
        res.redirect("/listings");
    }
};

// --- PROFILE EDIT & DELETE LOGIC ---

module.exports.renderEditProfileForm = (req, res) => {
    res.render("users/editProfile.ejs");
};

module.exports.destroyAccount = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.avatar && user.avatar.filename) {
            await cloudinary.uploader.destroy(user.avatar.filename);
        }
        await User.findByIdAndDelete(req.user._id);
        req.logout((err) => {
            if (err) return next(err);
            req.flash("success", "Account and all listings deleted.");
            return res.redirect("/listings");
        });
    } catch (err) {
        if (res.headersSent) return next(err);
        req.flash("error", "Failed to delete account.");
        return res.redirect("/profile/edit");
    }
};

module.exports.updateProfile = async (req, res, next) => {
    try {
        let { username, email } = req.body;
        const user = await User.findById(req.user._id);
        user.username = username;
        user.email = email;
        if (req.file) {
            if (user.avatar && user.avatar.filename) {
                await cloudinary.uploader.destroy(user.avatar.filename);
            }
            user.avatar = { url: req.file.path, filename: req.file.filename };
        }
        await user.save();
        req.flash("success", "Profile updated successfully!");
        return res.redirect("/profile");
    } catch (err) {
        if (res.headersSent) return next(err);
        req.flash("error", err.message);
        return res.redirect("/profile/edit");
    }
};

// --- NEW: HOST ANALYTICS DASHBOARD LOGIC ---

module.exports.renderDashboard = async (req, res) => {
    try {
        // 1. Get listings owned by current user
        const userListings = await Listing.find({ owner: req.user._id });
        const listingIds = userListings.map(l => l._id);

        // 2. Get all bookings for those specific listings
        const bookings = await Booking.find({ listing: { $in: listingIds } })
            .populate("listing")
            .populate("user");

        // 3. Overall Stats
        const totalEarnings = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);
        const totalBookings = bookings.length;

        // 4. Chart Data: Last 6 Months Revenue
        const monthlyData = new Array(6).fill(0);
        const monthLabels = [];
        const today = new Date();

        for (let i = 5; i >= 0; i--) {
            const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
            monthLabels.push(d.toLocaleString('default', { month: 'short' }));
            
            const monthlySum = bookings.filter(b => {
                const bDate = new Date(b.createdAt || b.checkIn);
                return bDate.getMonth() === d.getMonth() && bDate.getFullYear() === d.getFullYear();
            }).reduce((sum, b) => sum + (b.totalPrice || 0), 0);
            
            monthlyData[5-i] = monthlySum;
        }

        // 5. Arriving Today
        const startOfToday = new Date().setHours(0,0,0,0);
        const endOfToday = new Date().setHours(23,59,59,999);
        const incomingGuests = bookings.filter(b => 
            new Date(b.checkIn) >= startOfToday && new Date(b.checkIn) <= endOfToday
        );

        res.render("users/dashboard.ejs", { 
            totalEarnings, 
            totalBookings, 
            incomingGuests, 
            monthLabels, 
            monthlyData 
        });
    } catch (err) {
        req.flash("error", "Unable to load dashboard stats.");
        res.redirect("/profile");
    }
};