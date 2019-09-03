const router = require("express").Router();
const db = require("../models");
const passport = require("passport");
const { isLoggedIn, isSignIn } = require("../lib/out");

router.get("/signup", isSignIn, (req, res) => {
  res.render("auth/signup");
});

/*router.post("/signup", (req, res) => {
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  });

  res.send("received");
});*/

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
  })
);

router.get("/signin", isSignIn, (req, res) => {
  res.render("auth/signin");
});

router.post("/signin", (req, res, next) => {
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true
  })(req, res, next);
});

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("pages/profile");
});

router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

module.exports = router;
