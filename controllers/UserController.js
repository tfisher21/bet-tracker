var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    passport = require("passport");
    
router.use(bodyParser.urlencoded({ extended: true }));

// MODELS
var User = require("../models/user")

// ROUTES

// INDEX - show all users
router.get("/", function(req, res) {
  User.find({}, function(err, allUsers){
    if (err) {
      console.log(err);
    } else {
      res.render("users/index", {users: allUsers});
    }
  });
});

// NEW - show new user form 
router.get("/signup", function(req, res){
  res.render("users/signup");
});

// CREATE - create user and add to database
router.post("/signup", function(req, res){
  User.register(new User({username: req.body.username,
                          firstName: req.body.fname,
                          lastName: req.body.lname
  }), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/signup");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/");
        });
    });
});

// SHOW - show user profile
router.get("/:id", function(req, res){
  User.findById(req.params.id, function(err, user){
    if (err) {
      console.log(err);
    } else {
      res.render("users/show", {user: user});
    }
  });
});

module.exports = router;