var router = require("express").Router();
var passport = require("passport");

// Set up login route
router.get("/login", (req, res) => {
  res.render("login", {user: req.user});
});

// Set up logout route
router.get("/logout", (req, res) => {
  // Handle with passport
  req.logout();
  res.redirect("/");
});

// Set up login with Google
router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
})); 

// Set up callback redirect routing back to app after user has been authenticated.
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  res.redirect("/profile/");
});

module.exports = router;