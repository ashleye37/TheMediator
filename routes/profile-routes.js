var router = require("express").Router();

var authCheck = (req, res, next) => {
  if(!req.user) {
    // if user is not logged in.
    res.redirect("/auth/login");
  } else {
    // if the user is logged in.
    next();
  }
}

router.get("/", authCheck, (req, res) => {
  res.render("profile", {user: req.user});
});

module.exports = router;