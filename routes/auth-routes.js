var router = require("express").Router();
var passport = require("passport");

// Set up login route
router.get("/login", (req, res) => {
  res.render("login");
});

// Set up logout route
router.get("/logout", (req, res) => {
  // Handle with passport
  res.send("logging out");
});

// Set up login with Google
router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
})); 

// Set up callback redirect routing back to app after user has been authenticated.
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.send("You've reached the callback URI");
});

module.exports = router;