const User = require("../models/user.js")
// signup  render route
module.exports.rendersignup = async (req, res) => {
    res.render("users/signup.ejs")
  }
// signup route
module.exports.signup = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newuser = new User({ email, username });
      let result = await User.register(newuser, password);
      console.log(result);
      // auto logins once signup
      req.login(result, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "  You are  Logged In !")
        let redirecturl = res.locals.redirectUrl || "/listings";
        res.redirect(redirecturl);
        // let redirectpage=req.session.redirectUrl|| "/listings";
        // res.redirect(redirectpage);
  
  
      })
  
    }
    catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup")
    }
  }
//loginRender route
module.exports.loginRender=async (req, res) => {
    res.render("users/login.ejs")
  }
// login route
module.exports.login=async (req, res) => {
    req.flash("success", "welcome back to wonderlust")
    let redirecturl = res.locals.redirectUrl || "/listings";
    res.redirect(redirecturl);
  }
// logout route
module.exports.logout=(req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "you are looged out now!")
      res.redirect("/listings")
    })
  }