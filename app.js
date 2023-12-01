if (process.env.NODE_ENV !== "production") {
  require("dotenv").config(); // Invoke the config function
}

const express = require('express')
const app = express()
const port = 3000;
const path=require("path");

const Listing=require("./models/listing.js")
const Review=require("./models/review.js")
const { v4: uuidv4 } = require('uuid');
var methodOverride = require('method-override')
const ejsmate = require('ejs-mate')
const wrapAsync=require("./utils/wrapAsync.js")
const ExpressError=require("./utils/ExpressError.js")
const Joi = require('joi');
const { listingSchema, reviewSchema,isAuthor } = require('./schema.js'); 
const listings=require("./router/listing.js")
const reviews=require("./router/review.js")
const users=require("./router/user.js")
// passport
const passport = require('passport')
const LocalStrategy=require("passport-local")
const User=require("./models/user.js");


app.use(express.static(path.join(__dirname,"public")));

// cookies
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
var flash = require('connect-flash');

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}));
app.use(express.json());





app.engine('ejs', ejsmate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
const mongoose = require('mongoose');
const { error } = require('console');
const dburl=process.env.ATLAST_DB
main().then((res)=>{
    console.log("mongoose connection sucess")
}).catch((err)=>{
    console.log("error",err);
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(dburl);

}
// app.get("/",(req,res)=>{
//     res.send("air bnb");
// })
// session and flash 
const store=MongoStore.create({
  mongoUrl:dburl,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter:24*3600
})
store.on("error",()=>{
  console.log("error");
})
app.use(session({
  store:store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
}))

app.use(flash());
// password Authenticate
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User. authenticate() ));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// to render into views 
app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  // nav.js 
  res.locals.curUser=req.user;
  next()
})




app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews); 
app.use("/",users);

app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"page not found"));
})
app.use((err, req, res, next) => {
  let { status=500, message="something went wrong" } = err;
  // res.status(status).send(message);
  res.status(status).render("listings/error.ejs",{err})

});

app.listen(port, () => {
    console.log(` express is  listening on port ${port}`)
  });