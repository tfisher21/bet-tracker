var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect('mongodb://localhost/my_database');

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
  secret: "One bet to save the world",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

////////////////////
// ROUTES - ROOT
////////////////////
app.get("/", function(req, res){
  res.render("home");
});


////////////////////
// ROUTES - USERS
////////////////////

// INDEX - show all users
app.get("/users", function(req, res) {
  User.find({}, function(err, allUsers){
    if (err) {
      console.log(err);
    } else {
      res.render("users/index", {users: allUsers});
    }
  });
});

// NEW - show new user form 
app.get("/signup", function(req, res){
  res.render("users/signup");
});

// CREATE - create user and add to database
app.post("/signup", function(req, res){
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
app.get("/users/:id", function(req, res){
  User.findById(req.params.id, function(err, user){
    if (err) {
      console.log(err);
    } else {
      res.render("users/show", {user: user});
    }
  });
});


////////////////////
// ROUTES - AUTH
////////////////////
app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/");
});

////////////////////

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Online.");
});
