var express = require("express");
var app = express();
var db = require("./db");
var methodOverride = require("method-override");

var bodyParser = require("body-parser");
var passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");


// MODELS
var User = require("./models/user");
var seedDB = require("./seeds");

// CONFIGURATION - General
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

seedDB(); //seed the database

// CONFIGURATION - Passport
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


// ROUTES
var UserController = require("./controllers/UserController");
app.use("/users", UserController);

var IndexController = require("./controllers/IndexController");
app.use("/", IndexController);


module.exports = app;