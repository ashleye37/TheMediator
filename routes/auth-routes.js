var passport = require("passport");

module.exports = function(app) {
  // Set up login with Google
  app.get("/auth/google", 
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login"]
  }));

  // Set up callback redirect routing back to app after user has been authenticated.
  app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }),
    function (req, res) {
      req.session.token = req.user.token;
      res.redirect("/");
    });
};