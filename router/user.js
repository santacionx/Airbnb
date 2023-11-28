const express = require('express')
const router=express.Router()
const User=require("../models/user.js")
const wrapAsync=require("../utils/wrapAsync.js")
const ExpressError=require("../utils/ExpressError.js")
const passport = require('passport')
const {SaveRedirectUrl}=require("../middleware.js")
// signup
router.get("/signup",wrapAsync(async(req,res)=>{
  res.render("users/signup.ejs")
}))

router.post("/signup",SaveRedirectUrl,wrapAsync(async(req,res)=>{
    try{
        let {username, email,password}=req.body;
     const newuser= new User({email,username});
     let result= await User.register(newuser,password);
     console.log(result);
    // auto logins once signup
     req.login(result,(err)=>{
      if(err){
        return next(err);
      }
      req.flash("success","  You are  Logged In !")
      let redirecturl=res.locals.redirectUrl || "/listings";
      res.redirect(redirecturl);
      // let redirectpage=req.session.redirectUrl|| "/listings";
      // res.redirect(redirectpage);
     

     })
    
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup")
    }
  }))
//  login 
router.get("/login",async(req,res)=>{
    res.render("users/login.ejs")
})

router.post("/login",
SaveRedirectUrl,
passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
async(req,res)=>{
    req.flash("success","welcome back to wonderlust")
    let redirecturl=res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);
})

router.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if(err){
     return  next(err);
    }
    req.flash("success", "you are looged out now!")
    res.redirect("/listings")
  })
})
module.exports=router;
