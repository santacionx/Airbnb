const express = require('express')
const app = express()
const port = 3000;
const path=require("path");
const Listing=require("./models/listing.js")
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
const ejsmate = require('ejs-mate')
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const Joi = require('joi');
const listingSchema = require('./schema.js');
app.use(express.static(path.join(__dirname,"public")));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs', ejsmate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const mongoose = require('mongoose');
const { error } = require('console');
main().then((res)=>{
    console.log("mongoose connection sucess")
}).catch((err)=>{
    console.log("error",err);
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

}
app.get("/",(req,res)=>{
    res.send("air bnb");
})
// valdiation schema
const validateListing=(req,res,next)=>{
  let {error}=listingSchema.validate(req.body);
  if (error) {
    let errormsg= error.details.map(err => err.message).join(', ')
    throw new ExpressError(400, errormsg);
  }else{
    next();
  }
}
//Index Route
app.get("/listings", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });

  
//Show Route
app.get("/listings/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    console.log(listing.image.url)
    res.render("listings/show.ejs", { listing });
  }));


//Create Route
app.post("/listings",validateListing,wrapAsync(async (req, res,next) => {

  const newListing = new Listing({
    title: req.body.listing.title,
    description: req.body.listing.description,
    image: req.body.listing.image, 
    price: req.body.listing.price,
    country: req.body.listing.country,
    location: req.body.listing.location
   
  });
    await newListing.save();
    res.redirect("/listings");

}));

   
  //Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
app.put("/listings/:id",validateListing,wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));
})
app.use((err, req, res, next) => {
  let { status=500, message="something went wrong" } = err;
  // res.status(status).send(message);
  res.status(status).render("listings/error.ejs",{err})
});

app.listen(port, () => {
    console.log(` express is  listening on port ${port}`)
  });