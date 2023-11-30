const express = require('express')
const router=express.Router()
const Joi = require('joi');
const Listing=require("../models/listing.js")
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const { listingSchema} = require('../schema.js'); 
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listController=require("../controller/listings.js")
const multer =require("multer");
const {storage}=require("../cloudConfig.js")
const upload = multer({storage});

  //Index Route
router.get("/", wrapAsync(listController.index));

//New Route
router.get("/new",isLoggedIn ,listController.newroute);

  
//Show Route
router.get("/:id",wrapAsync( listController.show));

router.get('/:id', wrapAsync(async (req, res) => {
  const listingId = req.params.id; // Get the ID from the request parameters
  try {
      const listing = await Listing.findById(listingId);
      if (!listing) {
          return res.status(404).json({ error: 'Listing not found' });
      }
      // Assuming 'coordinates' is a property of the listing
      const coordinates = listing.coordinates; // Adjust this to match your data structure
      
      res.json({ listing, coordinates }); // Send the listing and coordinates as JSON
  } catch (error) {
      console.error('Error fetching listing:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
}));

//Create Route
// router.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listController.create));

router.post("/", isLoggedIn, upload.single("listing[image]"),validateListing,wrapAsync(listController.create));
   
  //Edit Route
  router.get("/:id/edit",isLoggedIn,isOwner ,wrapAsync(listController.edit));

//Update Route
router.put("/:id",isLoggedIn,isOwner, upload.single("listing[image]"),validateListing,wrapAsync(listController.update));
  // router.put("/",  upload.single("listing[image]"),(req,res)=>{
  //   res.send(req.file)
  // });

//Delete  listing Route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listController.deleted));
module.exports=router;