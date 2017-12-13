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


////////////////////
// ROUTES - ROOT
////////////////////
app.get("/", function(req, res){
  res.render("home");
});


////////////////////
// ROUTES - USERS
////////////////////

// NEW - Show new user form 
app.get("/signup", function(req, res){
  res.render("users/signup");
});

// CREATE - create user
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



////////////////////

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Online.");
});
