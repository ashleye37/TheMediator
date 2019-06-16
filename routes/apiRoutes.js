var db = require("../models");
var Sequelize = require("sequelize");

module.exports = function (app) {
  // Get a random pair
  app.get("/api/photos", function (req, res) {
    db.Photo.findOne({
      order: Sequelize.literal('rand()')
    }).then(function (photos) {
      res.json(photos);
    });
  });

  // Add new photo pair
  app.post("/api/photos", function (req, res) {
    db.Photo.create({
      primaryPath: req.body.primaryPath,
      secondPath: req.body.secondPath
    }).then(function (photos) {
      res.json(photos);
    });
  });

  // Update scores
  app.put("/api/photos", function(req, res) {
    db.Photo.update({
      primaryWins: req.body.primaryWins,
      secondWins: req.body.secondWins
    }).then(function(photos){
      res.json(photos);
    });
  });

  // // Get all examples
  // app.get("/profile", function(req, res) {
  //   db.User.findAll({}).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

  // // Create a new example
  // app.post("/api/users", function(req, res) {
  //   db.User.create(req.body).then(function(dbUser) {
  //     res.json(dbUser);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/user/:id", function(req, res) {
  //   db.User.destroy({ where: { id: req.params.id } }).then(function(
  //     dbUser
  //   ) {
  //     res.json(dbUser);
  //   });
  // });
};
