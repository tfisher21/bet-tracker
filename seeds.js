var mongoose  = require("mongoose"),
    faker     = require("faker");

var User = require("./models/user");

var data = [
  {
    firstName:  faker.name.firstName(),
    lastName:   faker.name.lastName(),
    username:   faker.internet.exampleEmail(),
    image:      faker.image.avatar(),
    password:   "password"
  },
  {
    firstName:  faker.name.firstName(),
    lastName:   faker.name.lastName(),
    username:   faker.internet.exampleEmail(),
    image:      faker.image.avatar(),
    password:   "password"
  },
  {
    firstName:  faker.name.firstName(),
    lastName:   faker.name.lastName(),
    username:   faker.internet.exampleEmail(),
    image:      faker.image.avatar(),
    password:   "password"
  },
  {
    username: "tfisher@example.com",
    firstName: "Tyler",
    lastName: "Fisher",
    image: "https://i.imgur.com/bju4ICr.jpg",
    password: "password"
  }
]

function seedDB(){
   // remove all users
   User.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed users!");
         // add sample users
        data.forEach(function(seed){
            User.register(new User({username:   seed.username,
                                    firstName:  seed.firstName,
                                    lastName:   seed.lastName,
                                    image:      seed.image
            }), seed.password, function(err, user){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a user");
                }
            });
        });
    }); 
}

module.exports = seedDB;