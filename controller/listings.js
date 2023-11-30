const Listing = require("../models/listing.js")

// index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  }

//new route 
module.exports.newroute = (req, res) => {
    res.render("listings/new.ejs");
  }
//show route 
module.exports.show = async (req, res) => {
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
  }
//   module.exports.create = async (req, res, next) => {
//       let url=req.file.path;
//       let filename=req.file.filename;
//         console.log(req.file," ", req.file.path)
//         const newListing = new Listing(req.body.listing);
//         newListing.owner = req.user._id;
//         newListing.image.url=url;
//         newListing.image.filename=filename;
//         await newListing.save();
//         req.flash("success", "New Listing Created!");
//         res.redirect("/listings");
    
// };
module.exports.create = async (req, res, next) => {
 
      // Extracting file information from the request
      const { path: filePath, filename } = req.file;

      // Creating a new Listing object with data from the request body
      const newListing = new Listing({
          ...req.body.listing,
          owner: req.user._id, // Assuming req.user contains user information
          image: {
              url: filePath, // Assigning the file path as the image URL
              filename: filename // Assigning the uploaded file's name
          }
      });

      // Saving the new listing to the database
      await newListing.save();

      // Setting a success flash message
      req.flash("success", "New Listing Created!");

      // Redirecting to the listings page
      res.redirect("/listings");
};
//Edit Route
module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","  oops! Listing not exits!");
     return res.redirect("/listings");
    }
    // let orginalImage=listing.image.url;
    // orginalImage=orginalImage.replace("/upload","/upload/c_fill,h_300,w_250/")
    res.render("listings/edit.ejs", { listing });
  }
//Update Route
module.exports.update = async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){
      const { path: filePath, filename } = req.file;
      listing.image.url = filePath;
      listing.image.filename = filename;
      await listing.save();
    }
    
    req.flash("success","  Listing updated !")
    res.redirect(`/listings/${id}`);
  }


//Delete  listing Route
module.exports.deleted = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","  Listing Deleted !")
  res.redirect("/listings");
}