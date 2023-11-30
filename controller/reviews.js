const Listing=require("../models/listing.js")
const Review=require("../models/review.js")

// create review 
module.exports.createReview=async (req, res) => {
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

}
module.exports.deleteReview=async (req, res) => {
    const { id, reviewId } = req.params;
      // Removing the specific reviewId from the 'reviews' array in the 'Listing'
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    
    // Deleting the review using its own model
    await Review.findByIdAndDelete(reviewId);
    req.flash("success"," Review  Deleted !")
    res.redirect(`/listings/${id}`);
  }
  