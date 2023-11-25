const express = require('express')
const app = express()
const port = 3000;
const path=require("path");
const Listing=require("./models/listing.js")
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')

app.use(express.static(path.join(__dirname,"public")));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
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
    res.render("listings/show.ejs", { listing });
  });


//Create Route
app.post("/listings", async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  });

  //Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  console.log(listing)
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