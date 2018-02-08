var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Session = require("../models/dataModels")
var passport = require("passport")

var sessionId = Object(); //NOT SURE IF THIS IS SAFE

//First form
router.get("/step1", function(req, res){
    //First form
    res.render("step1");
});


//First data entry route
router.post("/step1", function(req, res){
   //req.checkBody("gravity", "Invalid age").notEmpty().isInt();
    var errors = req.validationErrors();
        if (errors) {
            console.log(errors);
            res.render("step1", {errorToDisplay: errors});
        }
        else {
            //get data from the form to add to the object initData
            var gravity = req.body.gravity; //have to assign it to a var
         
            //create object to add (it's incomplete so I think we update next time)
            var initData = {
            grav: gravity,
            long: undefined,
            lat: undefined,
            age: undefined,
            sex: undefined,
            height: undefined,
            weight: undefined,
            start: undefined,
            end: undefined,
            dur: undefined,
            alt: undefined,
            numDrinks: undefined,
            numBeers: undefined,
            typeBeers:{type1: undefined},
            numCocktails: undefined,
            typeCocktails:{type1: undefined},
            numShots: undefined,
            typeShots:{type1: undefined},
            numWines: undefined,
            typeWines:{type1: undefined},
            numWaters: undefined,
            maxPerHour: undefined,
            minPerHour: undefined,
            };
            
            //Send partial to DB
            Session.create(initData, function(err, newlyCreated){
                if(err){
                    console.log(err);
                }
                else{
                    //send em to the next page
                    console.log("we entered some info")
                    //This works and returns the ID!Keep passing it through to modify the schema
                    console.log(newlyCreated._id);//getting the id of new data set to update further down the road;
                    sessionId = newlyCreated._id;
                    res.redirect("/step2"); 
                }
            });
        }
})

router.get("/step2", function(req, res){
    //Second form
    res.render("step2");
});

//CREATE - add new data from first form
router.post("/step2", function(req, res){
    //get data from the form to add to the object initData
    var longitude = req.body.longitude; //have to assign it to a var
    var latitude = req.body.latitude;
    var age = req.body.age;
    var sex = req.body.sex;
    //=====================================//
    //                 TODO
    //=====================================//
    //modify and update with new info
    //var modData = {}
    //Send partial to DB
    Session.update({_id: sessionId}, {$set:{ long: longitude}}, function(err, res){
         if(err){
            console.log(err);
        }
        else{
            //send em to the next page
            console.log("we updated some info");
        }
    });
    res.redirect("/step3"); 
});

router.get("/step3", function(req, res){
    //Third form
    res.render("step3");
});

//CREATE - add new data from first form
router.post("/step3", function(req, res){
    //get data from the form to add to the object initData
    var duration = req.body.duration; //have to capture form data to var
    var drinks = req.body.drinks;
    var waters = req.body.waters;

    Session.update({_id: sessionId}, {$set:{ dur: duration}}, function(err, res){
         if(err){
            console.log(err);
        }
        else{
            //send em to the next page
            console.log("we updated some info")
        }
    });
    res.redirect("/resultstest"); 
});

router.get("/resultstest", function(req, res){
    Session.find({}, function(err, allData){
        if(err){
            console.log("Errooorr eroorror");
        }
        else{
            res.render("resultstest", {session: allData});
        }
    });
});

//MIDDLEWARE
//almost always take 3 parameters
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect("/login");
};

module.exports = router;