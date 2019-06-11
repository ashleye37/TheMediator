var router = require("express").Router();

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
router.get("/google", (req, res) => {
  // Handle with passport
  res.send("Logging in with Google");
});

module.exports = router;