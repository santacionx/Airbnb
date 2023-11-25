const express = require('express')
const app = express()
const port = 3000;
const path=require("path");
const Listing=require("./models/listing.js")
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
const ejsmate = require('ejs-mate')

app.use(express.static(path.join(__dirname,"public")));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs', ejsmate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const mongoose = require('mongoose');
main().then((res)=>{
    console.log("mongoose connection sucess")
}).catch((err)=>{
    console.log("error",err);
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

}
app.get("/",(req,res)=>{
    res.send("air bnb");
})
//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  });

//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
  });

  
//Show Route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    console.log(listing.image.url)
    res.render("listings/show.ejs", { listing });
  });


//Create Route
app.post("/listings", async (req, res) => {
  const newListing = new Listing({
    title: req.body.listing.title,
    description: req.body.listing.description,
    image: req.body.listing.image, // Assuming 'image' is a field in your Listing model
    price: req.body.listing.price,
    country: req.body.listing.country,
    location: req.body.listing.location
    // Add other fields as needed
  });
console.log(newListing);
  try {
    await newListing.save();
    res.redirect("/listings");
  } catch (err) {
    // Handle error
    console.error(err);
    res.status(500).send("Error creating listing");
  }
});

// Assuming your Listing model schema looks like this:


   
  //Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

  
app.listen(port, () => {
    console.log(` express is  listening on port ${port}`)
  });