const User = require("../models/user");

//Render signupForm to User page
module.exports.renderSignupForm = (req,res) => {
    res.render("users/signup.ejs")
};

module.exports.signup = (async (req,res) => {
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        let registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        //below code logic for when sigup it will login automiticallly
        req.login(registeredUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wonderlust!");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
});

module.exports.loginForm = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req,res) => {
    req.flash("success","Welcome back to  Wonderlust!");
    res.redirect(res.locals.redirectUrl || "/listings"); //after login we redirect to newlisting page
};

module.exports.logout =  (req,res,next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    });
};



