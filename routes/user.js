
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport"); // in login page we used authetication so used passport package
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controller/users.js");


router.route("/signup")
.get(userController.renderSignupForm)   //get user
.post(wrapAsync(userController.signup));  //post user


router.route("/login")
.get(userController.loginForm)    //get login
.post(saveRedirectUrl,            //post login
    passport.authenticate("local", {
        failureRedirect: '/login',
        failureFlash: true,
    }), 
    userController.login
);


//logout User
router.get("/logout", userController.logout);


module.exports = router;



