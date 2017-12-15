var express     = require("express"),
    router      = express.Router(),
    bodyParser  = require("body-parser"),
    passport    = require("passport"),
    request     = require("request");
    
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
router.get("/new", function(req, res){
  res.render("users/new");
});

// CREATE - create user and add to database
router.post("/new", function(req, res){
  User.register(new User({username: req.body.username,
                          firstName: req.body.fname,
                          lastName: req.body.lname
  }), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect("/users/new");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/users");
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

// EDIT
router.get("/:id/edit", function(req, res){
  User.findById(req.params.id, function(err, user){
    if (err) {
      console.log(err);
    } else {
      res.render("users/edit", {user: user});
    }
  });
});


// UPDATE
router.put("/:id", function(req, res){
  var newData = {firstName: req.body.fname, lastName: req.body.lname, username: req.body.username};
  User.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/users");
    } else {
      res.redirect("/");
    }
  });
});


//DESTROY


///////////////

module.exports = router;