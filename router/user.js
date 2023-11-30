const express = require('express')
const router = express.Router()
const User = require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const passport = require('passport')
const { SaveRedirectUrl } = require("../middleware.js")
const formListing=require("../controller/users.js")
// signup
router.get("/signup", wrapAsync(formListing.rendersignup))

router.post("/signup", SaveRedirectUrl, wrapAsync(formListing.signup))
//  login 
router.get("/login",formListing.loginRender )

router.post("/login",
  SaveRedirectUrl,
  passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }),
  formListing.login
  )
// logout 
router.get("/logout", formListing.logout)
module.exports = router;
