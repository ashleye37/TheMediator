var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    if(req.session.token) {
      db.User.findAll({}).then(function(dbUser) {
        res.cookie('token', req.session.token); // Send session token back to client
        res.render("index", {
          msg: "Welcome!",
          examples: dbUser
        });
      });
    } else {
    // User is not authenticated, render login page
    res.cookie('token', '')
    res.render("login");
    }
  });

  app.get("/login", (req, res) => {
    res.render("login");
  })
  
  // Logout route
  app.get('/logout', (req, res) => {
    req.logout(); // Call passport logout method
    req.session = null; // Remove session
    res.redirect("/"); // Redirect to index route which will show them login template
  });

  // Load example page and pass in an example by id
  app.get("/profile/:googleId", function (req, res) {
    db.User.findAll({ where: { googleId: req.params.googleId } }).then(function (
      dbUser
    ) {
      res.render("profile", {
        example: dbUser
      });
      console.log(dbUser);
    });
  }); 

  app.get("/auth/google", 
  passport.authenticate("google", {
    scope: ["profile"]
  }));

  // Set up callback redirect routing back to app after user has been authenticated.
  app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }),
    function (req, res) {
      req.session.token = req.user.token;
      res.redirect("/profile/" + req.params.googleId);
    });

  app.get("/vote", function(req, res) {
    res.render("vote");
  });


  app.get("/battle", function(req, res) {
    res.render("battle");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
