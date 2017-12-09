var express = require("express");
var app = express();

app.get("/", function(req, res){
  res.render("home.ejs");
});

// Tell Express to listen for requests (start server)
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server is Online.");
});
