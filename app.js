var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"),
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    validator        = require("express-validator"), //express helper for validating input data
    Session          = require("./models/dataModels"),// data model for session 
    User             = require("./models/user"),// data model for user
    seedDB           = require("./seeds")
    
//===================
//  Refactored Routes
//===================
var databaseRoutes   = require("./routes/database"),
    authRoutes       = require("./routes/auth"),
    indexRoutes      = require("./routes/index")
    

//seed and start our database
//seedDB();

//option so not having a DATABASEURL won't break code
//var url = process.env.DATABASEURL || "mongodb://localhost/hangovr"
//mongoose.connect(url)

mongoose.connect("mongodb://cjacobs7:Decklife19@ds229648.mlab.com:29648/hangovr"); //DATABASEURL added through export DATABASEURL==" "


//semantics, copy pasted dont touch
app.set("view engine", "ejs"); //so we don't have to type .ejs for each call
app.use(bodyParser.urlencoded({extended: true}));//not sure just need it
app.use(express.static(__dirname + '/public')); //to direct to public folder
app.use(validator());

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Ko0ks bail",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//glovbal variable to pass every route
app.use(function(req, res, next){
   res.locals.currentUser = req.user; 
   next();
});

app.get("/", function(req, res){
    res.render("landing", {currentUser: req.user});
});


app.use(databaseRoutes);
app.use(authRoutes);

//MIDDLEWARE
//almost always take 3 parameters
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    };
    res.redirect("/login");
};

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Hangovr server has started!");
});