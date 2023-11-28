const express = require('express')
const router=express.Router()
const Joi = require('joi');
const Listing=require("../models/listing.js")
const wrapAsync=require("../utils/wrapAsync.js")
// const ExpressError=require("../utils/ExpressError.js")
// const { listingSchema} = require('../schema.js'); 
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");


  //Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }));

//New Route
router.get("/new",isLoggedIn ,(req, res) => {
    res.render("listings/new.ejs");
  });

  
//Show Route
router.get("/:id",wrapAsync( async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({path:"reviews",
      populate:{path:"author"},
    }).populate("owner")
  
    if(!listing){
      req.flash("error","  oops! Listing not exits!");
      return  res.redirect("/listings");
    }
    console.log(listing.owner)
    res.render("listings/show.ejs", { listing });
  }));


//Create Route
router.post("/",isLoggedIn,validateListing,wrapAsync(async (req, res,next) => {

  const newListing = new Listing({
    title: req.body.listing.title,
    description: req.body.listing.description,
    image: req.body.listing.image, 
    price: req.body.listing.price,
    country: req.body.listing.country,
    location: req.body.listing.location,
    
   
  });
  //  whenever ur creating new listing we need to fix owner name
  newListing.owner=req.user._id
  
    await newListing.save();
    req.flash("success"," New Listing Created !")
    res.redirect("/listings");

}));

   
  //Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner ,wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","  oops! Listing not exits!");
   return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
}));

//Update Route
router.put("/:id",isLoggedIn,isOwner,validateListing,wrapAsync(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success","  Listing updated !")
  res.redirect(`/listings/${id}`);
}));

//Delete  listing Route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","  Listing Deleted !")
  res.redirect("/listings");
}));
module.exports=router;