var mongoose   = require("mongoose");

//SCHEMA SETUP
/*var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    zipcode: String,
    age: String 
});*/

//module.exports = mongoose.model("User", userSchema);

var sessionSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    grav: Number,
    long: Number,
    lat: Number,
    age: Number,
    sex: String,
    height: Number,
    weight: Number,
    start: String,
    end: String,
    dur: Number,
    alt: Number,
    numDrinks: Number,
    numBeers: Number,
    typeBeers:{type1: String},
    numCocktails: Number,
    typeCocktails:{type1: String},
    numShots: Number,
    typeShots:{type1: String},
    numWines: Number,
    typeWines:{type1: String},
    numWaters: Number,
    maxPerHour: Number,
    minPerHour: Number,
});

module.exports = mongoose.model("Session", sessionSchema);