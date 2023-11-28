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
        .populate({
            path: "reviews",
            populate: { path: "author" },
        }).populate("owner")

    if (!listing) {
        req.flash("error", "  oops! Listing not exits!");
        return res.redirect("/listings");
    }
    console.log(listing.owner)
    res.render("listings/show.ejs", { listing });
}

//Create Route
module.exports.create = async (req, res, next) => {
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,"..", filename);
    const newListing = new Listing({
        title: req.body.listing.title,
        description: req.body.listing.description,
        image: req.body.listing.image,
        price: req.body.listing.price,
        country: req.body.listing.country,
        location: req.body.listing.location,


    });
    //  whenever ur creating new listing we need to fix owner name
    newListing[url]=url;
    newListing.filename=filename;
    newListing.owner = req.user._id

    await newListing.save();
    req.flash("success", " New Listing Created !")
    res.redirect("/listings");

}

//Edit Route
module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "  oops! Listing not exits!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing });
}

//Update Route
module.exports.update = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "  Listing updated !")
    res.redirect(`/listings/${id}`);
}

//Delete  listing Route
module.exports.deleted = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "  Listing Deleted !")
    res.redirect("/listings");
}