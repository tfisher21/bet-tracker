var express = require("express");
var app = express();
var mongoose = require("mongoose");

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost/my_database');

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
  res.send("Sign Up Success!");
});

////////////////////

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Online.");
});
