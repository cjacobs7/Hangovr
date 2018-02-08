var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport")


//show registration form
router.get("/register", function(req, res){
    res.render("register");
});

//signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res. render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
})

router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/step1",
        failureRedirect: "/login"
    }), function(req, res) {
});

router.get("/userpage", function(req, res) {
    res.render("/");
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

//MIDDLEWARE
//almost always take 3 parameters
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect("/login");
};

module.exports = router;