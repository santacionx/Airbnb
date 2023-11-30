const Listing=require("./models/listing")
const Review=require("./models/review.js")
const ExpressError=require("./utils/ExpressError.js")
const { reviewSchema } = require('./schema.js'); 
const { listingSchema} = require('./schema.js'); 
module.exports.isLoggedIn=(req,res,next)=>{
    // console.log(req.user);
    // console.log(req.path,"..",req.originalUrl);
    if (!req.isAuthenticated()) {
        // redirect url save if not looged in
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "Oops! Please login!");
        return res.redirect("/login"); 
     }
     next();
}
// 
module.exports.SaveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl)
    {
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner=async(req,res,next)=>{
    let { id } = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.curUser._id)){
        req.flash("error"," oops!  You don't have access !")
       return  res.redirect(`/listings/${id}`);
      }
      next();
}

module.exports.validateListing = (req, res, next) => {
  if (!req.body.listing) {
      throw new ExpressError(400, "Listing data not found in request body");
  }
  const { error } = listingSchema.validate(req.body.listing);
  if (error) {
      const errormsg = error.details.map(err => err.message).join(', ');
      throw new ExpressError(400, errormsg);
  } else {
      next();
  }
};

module.exports.validateReview = (req, res, next) => {
  if (!req.body.review) {
      throw new ExpressError(400, "Review data not found in request body");
  }

  const { error } = reviewSchema.validate(req.body.review);
  if (error) {
      const errormsg = error.details.map(err => err.message).join(', ');
      throw new ExpressError(400, errormsg);
  } else {
      next();
  }
};

  module.exports.isAuthor=async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curUser._id)){
        req.flash("error"," oops!  sorry ur not the author!")
        return  res.redirect(`/listings/${id}`);
      }
      next();
}