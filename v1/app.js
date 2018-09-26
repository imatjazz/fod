var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    path        = require("path");   // built in path module, used to resolve paths for relative files
    //path = __dirname + "/views/";
    // Campground  = require("./models/campground"),
    // Comment     = require("./models/comment"),
    // seedDB      = require("./seeds");
    // router      = express.Router();
//seedDB();

//mongoose.connect("mongodb://localhost/yelp_camp_v3");
//mongodb://<dbuser>:<dbpassword>@ds047050.mlab.com:47050/yelpcamp
mongodb://tiendo:123456@ds047050.mlab.com:47050/yelpcamp


// Static ============================================
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public/')));  //allow html file to reference stylesheet that is stored in ./css directory
app.set("view engine", "ejs");
//====================================================

// use this function below to check the directory path
// ====================================================
// app.use("/", function(req, res, next){
//     console.log(req.url);
//     next();
// });

//HOME -- show home page
app.get("/", function(req,res){  
    console.log(__dirname);
    res.render(path.join(__dirname,"/views/home"));
    //res.sendFile(path.join(__dirname,"/views/home.html" ));
    
});

// ABOUT US - show about us page
app.get("/aboutus", function(req,res){  
    console.log(__dirname);
    res.render(path.join(__dirname,"/views/about-us.ejs" ), {path: __dirname });    
});

// Contact Us
app.get("/contactus", function(req,res){  
    console.log(__dirname);
    res.render(path.join(__dirname,"/views/contact-us.ejs" ), {path: __dirname });    
});

// Coming Soon
app.get("/commingsoon", function(req,res){  
    console.log(__dirname);
    res.render(path.join(__dirname,"/views/comming-soon" ), {path: __dirname });    
});

//INDEX - show home page
// app.get("/aboutus", function(req,res){
//     // Get all campground from DB
//     Campground.find({}, function(err, allCampground){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("products/index", {products: allCampground});
//         }
//     });
// });

//CREATE - add new campground to DB
app.post("/products", function(req,res){
    // get data from form and add to products array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image:image, description:desc};

    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            // redirect back to products page
            res.redirect("/products");
        }
    });
});

//NEW - show form to create new campground
app.get("/products/new", function(req,res){
    res.render("products/new");
});

//SHOW - shows more info about one campground
app.get("/products/:id", function(req,res){
    //find the campground with provided Id
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render("products/show",{campground:foundCampground});
        }
    });

    //render show template with that campground
});


// =====================================================================================
// COMMENTS ROUTES
// =====================================================================================

app.get("/products/:id/comments/new", function(req,res){
    console.log("in new comment page now "+ req.params.id);
    // find campground by id
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground: foundCampground});
        }
    });
});

app.post("/products/:id/comments", function(req,res){
    // lookup campground using ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/products");
        } else {
            console.log(req.body.comment);
            // Comment.create(req.body.comment, function(err, comment){
            //     if(err){
            //         console.log(err);
            //     } else {
            //         foundCampground.comments.push(comment);
            //         foundCampground.save();
            //         res.redirect("/products/" + foundCampground._id);
            //     }
            // });
        }
    });
    // create new Comment
    // connect new commment to Campground
    // redirect campground
});



const PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
    console.log("======== RPABiz Server Has Started =========")
});

//this is special for testing Sat 12.21am mmmm
