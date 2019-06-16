var db = require("../models");

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
    res.render("/");
    }
  });
  
  // Logout route
  app.get('/logout', (req, res) => {
    req.logout(); // Call passport logout method
    req.session = null; // Remove session
    res.redirect('/'); // Redirect to index route which will show them login template
  });

  // Load example page and pass in an example by id
  app.get("/profile", function (req, res) {
    db.User.findOne({ where: { googleId: req.params.id } }).then(function (
      dbUser
    ) {
      res.render("profile", {
        example: dbUser
      });
    });
  });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  //NEED A PAGE AND ROUTE VOTE PAGE
  //POPULATE VOTE PAGE
    app.get("/vote/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("vote", {
        msg: "Ready to vote?!",
        example: dbExample
      });
    });
  });


  app.get("/battle", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("vote", {
        msg: "Time to battle!!",
        example: dbExample
      });
    });
  });




  //  // Load profile page and pass in an profile by id
  // app.get("/profile/:id", function(req, res) {
  //   db.Profile.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
  //     res.render("profile", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
