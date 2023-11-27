const express = require('express')
const Joi = require('joi');
const router=express.Router({mergeParams:true }) 
const Listing=require("../models/listing.js")
const Review=require("../models/review.js")

const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const { reviewSchema } = require('../schema.js'); 

const validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body.review); 
    if (error) {
      let errormsg = error.details.map(err => err.message).join(', ');
      throw new ExpressError(400, errormsg);
    } else {
      next();
    }
  };

  // reviews post
  router.post("/", validateReview,wrapAsync(async (req, res) => {
      let listing = await Listing.findById(req.params.id);
      let newReview = new Review(req.body.review);
    //   console.log(req.body.review)
      listing.reviews.push(newReview);
      await newReview.save();
      await listing.save();
      console.log("New review saved");
      req.flash("success","  Review Created !")
  
      // Redirect to the listing page after saving the review
      res.redirect(`/listings/${listing._id}`);
    
  })) ;

  router.delete("/:reviewId", wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
      // Removing the specific reviewId from the 'reviews' array in the 'Listing'
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  
    // Deleting the review using its own model
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review  Deleted !")
    res.redirect(`/listings/${id}`);
  }));
  module.exports=router;