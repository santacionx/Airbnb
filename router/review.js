const express = require('express')
const Joi = require('joi');
const router=express.Router({mergeParams:true }) 
const {isLoggedIn,isOwner,validateReview,isAuthor}=require("../middleware.js");
const wrapAsync=require("../utils/wrapAsync.js")
const {SaveRedirectUrl}=require("../middleware.js")

const reviewListing=require("../controller/reviews.js")
  // reviews post
  router.post("/",isLoggedIn,SaveRedirectUrl,validateReview,wrapAsync(reviewListing.createReview)) ;

  router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewListing.deleteReview));
  module.exports=router;