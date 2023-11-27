const express = require('express')
const router=express.Router()
const Joi = require('joi');
const Listing=require("../models/listing.js")
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const { listingSchema } = require('../schema.js'); 

// valdiation schema
const validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body.listing);
    console.log(req.body.listing.image)
    if (error) {
      let errormsg= error.details.map(err => err.message).join(', ')
      throw new ExpressError(400, errormsg);
    }else{
      next();
    }
  }

  //Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));

//New Route
router.get("/new", (req, res) => {
    res.render("listings/new.ejs");
  });

  
//Show Route
router.get("/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    // console.log(listing.image.url)
    if(!listing){
      req.flash("error","  oops! Listing not exits!");
      res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  }));


//Create Route
router.post("/",validateListing,wrapAsync(async (req, res,next) => {

  const newListing = new Listing({
    title: req.body.listing.title,
    description: req.body.listing.description,
    image: req.body.listing.image, 
    price: req.body.listing.price,
    country: req.body.listing.country,
    location: req.body.listing.location
   
  });
    await newListing.save();
    req.flash("success"," New Listing Created !")
    res.redirect("/listings");

}));

   
  //Edit Route
  router.get("/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","  oops! Listing not exits!");
    res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id",validateListing,wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","  Listing updated !")
  res.redirect(`/listings/${id}`);
}));

//Delete  listing Route
router.delete("/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","  Listing Deleted !")
  res.redirect("/listings");
}));
module.exports=router;