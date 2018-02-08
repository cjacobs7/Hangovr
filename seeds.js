var mongoose  = require("mongoose"),
    Session   = require("./models/dataModels"),
    User      = require("./models/user")
    
//fake sessions to insert to db
var maleFemale = ["male", "female"];
//var randomArrayChoice = Math.floor(Math.random() * 2);

//wipe old data and seed new data to db created by createRandData
function seedDB(){
    //remove all user data
    User.remove({}, function(err) {
        if(err){
            console.log("did not remove user data");
            console.log(err);
        }
        else{
            console.log("removed all user data");
        }
    });
    //remove all session data
    Session.remove({}, function(err){
    if(err){
        console.log(err);
    }
        console.log("removed sessions data");
    });
    //add some fake sessions
    for(var i = 0; i < 100; i++){
        var seed = createRandData();
        Session.create(seed, function(err, data){
            if(err){
                console.log(err)
            } else{
                console.log("added some fake session data");
            }
        });
    };
    //=====TODO===== add some fake users 
};

//create random data to enter into db
function createRandData(){
    //do the math
    var tempgrav = Math.floor(Math.random() * 10);
        //bounding box (clockwise and approx) San Diego, Kootenai Nat Forrest, Toronto, Charlotsville
    var templong = (Math.random() * 38) + 79;
    var templat = (Math.random() * 16) + 32;
    var tempage = Math.floor(Math.random() * 40) + 18;
    var tempsex = maleFemale[Math.floor(Math.random() * 2)];
    var tempheight = Math.floor(Math.random() * 36) + 50; // 4'2" to 7' 2" in inches
    var tempweight = Math.floor(Math.random() * 230) + 72; //between 72 and 300 lbs
    var tempstart = undefined; //time of day start
    var tempend = undefined; //time of day end
    var tempdur = Math.floor(Math.random() * 6) + 2; //between 2 and 8 hrs
    var tempalt = Math.floor(Math.random() * 7920); //sea level to mammoth lakes altitude 
    var tempnumDrinks = Math.floor(Math.random() * 10) + 2;
    var tempnumBeers = Math.floor(Math.random() * tempnumDrinks);
    var temptypeBeers = undefined;
    var tempnumCocktails = Math.floor(Math.random() * (tempnumDrinks - tempnumBeers));
    var temptypeCocktails = undefined;
    var tempnumShots = undefined;
    var temptypeShots = undefined;
    var tempnumWines = undefined;
    var temptypeWines = undefined;
    var tempnumWaters = undefined;
    var tempmaxPerHour = undefined;
    var tempminPerHour = undefined;
    
var data = [{
        grav: tempgrav,
        long: templong,
        lat: templat,
        age: tempage,
        sex: tempsex,
        height: tempheight,
        weight: tempweight,
        start: tempstart,
        end: tempend,
        dur: tempdur,
        alt: tempalt,
        numDrinks: tempnumDrinks,
        numBeers: tempnumBeers,
        typeBeers: temptypeBeers,
        numCocktails: tempnumCocktails,
        typeCocktails: temptypeCocktails,
        numShots: tempnumShots,
        typeShots: temptypeShots,
        numWines: tempnumWines,
        typeWines: temptypeWines,
        numWaters: tempnumWaters,
        maxPerHour: tempmaxPerHour,
        minPerHour: tempminPerHour
    }]
    return data;
};

module.exports = seedDB;