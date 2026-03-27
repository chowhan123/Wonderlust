const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");

// 1. Import Multer and Cloudinary Storage
const multer = require('multer');
const { storage } = require("../cloudConfig.js"); 
const upload = multer({ storage });

const userController = require("../controller/users.js");

// --- AUTH ROUTES ---
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(upload.single("avatar"), wrapAsync(userController.signup));

router.route("/login")
    .get(userController.loginForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: '/login',
            failureFlash: true,
        }), 
        userController.login
    );

router.get("/logout", userController.logout);

// --- PROFILE ROUTES ---
router.route("/profile")
    .get(isLoggedIn, wrapAsync(userController.renderProfile))
    .delete(isLoggedIn, wrapAsync(userController.destroyAccount));

router.route("/profile/edit")
    .get(isLoggedIn, wrapAsync(userController.renderEditProfileForm))
    .put(isLoggedIn, upload.single("avatar"), wrapAsync(userController.updateProfile));

// --- NEW: HOST DASHBOARD ROUTE ---
// This handles the logic for earnings, incoming guests, and Chart.js data
router.get("/dashboard", isLoggedIn, wrapAsync(userController.renderDashboard));

module.exports = router;