var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    if(req.session.token) {
      console.log("*******************");
      db.User.findAll({}).then(function(dbUser) {
        res.cookie('token', req.session.token); // Send session token back to client
        res.render("index");
      });
    } else {
    // User is not authenticated, render login page
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.cookie('token', '')
    res.render("login");
    }
  });

  // Route to Login page.
  app.get("/login", (req, res) => {
    res.render("login");
  })
  
  // Logout route
  app.get('/logout', (req, res) => {
    req.logout(); // Call passport logout method
    req.session = null; // Remove session
    res.redirect("/"); // Redirect to index route which will show them login template
  });

  // Load profile page and pass in an example by id
  app.get("/:googleId", function (req, res) {
    db.User.findAll({googleId: req.params.googleId}).then(function (dbUser) {
      res.render("index");
    });
  }); 

  // Authentication route - routing to google.
  app.get("/auth/google", 
  passport.authenticate("google", {
    scope: ["profile"]
  }));

  // Set up callback redirect routing back to app after user has been authenticated.
  app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }),
    function (req, res) {
      var googleId = res.req.user.profile.id;
      req.session.token = req.user.token;
      res.redirect("/index" + googleId);
    });

  // Routing to voting page.
  app.get("/vote", function(req, res) {
    console.log("I am trying to get to vote page.")
    res.render("vote");
  });

  // Routing to battle page.
  app.get("/battle", function(req, res) {
    console.log("I am trying to get to the battle page.")
    res.render("battle");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
