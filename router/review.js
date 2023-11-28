const express = require('express')
const Joi = require('joi');
const router=express.Router({mergeParams:true }) 
const Listing=require("../models/listing.js")
const Review=require("../models/review.js")
const {isLoggedIn,isOwner,validateReview,isAuthor}=require("../middleware.js");
const wrapAsync=require("../utils/wrapAsync.js")
const {SaveRedirectUrl}=require("../middleware.js")



  // reviews post
  router.post("/",isLoggedIn,SaveRedirectUrl,validateReview,wrapAsync(async (req, res) => {
      let listing = await Listing.findById(req.params.id);
      const newReview = new Review(req.body.review);
      // author is assigned when they review 
      newReview.author=req.user._id
      console.log(newReview)
    //   console.log(req.body.review)
      listing.reviews.push(newReview);
      await newReview.save();
      await listing.save();
      console.log("New review saved");
      req.flash("success","  Review Created !")
  
      // Redirect to the listing page after saving the review
      res.redirect(`/listings/${listing._id}`);
    
  })) ;

  router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
      // Removing the specific reviewId from the 'reviews' array in the 'Listing'
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    
    // Deleting the review using its own model
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review  Deleted !")
    res.redirect(`/listings/${id}`);
  }));
  module.exports=router;