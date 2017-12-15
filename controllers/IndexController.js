var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    passport = require("passport");


// ROUTES

// ROOT PATH
router.get("/", function(req, res){
  res.render("home");
});

// LOGIN - get login view
router.get("/login", function(req, res){
  res.render("login");
});

// LOGIN - authenticate login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// LOGIN
router.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});


module.exports = router;