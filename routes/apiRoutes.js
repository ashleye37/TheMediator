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
};
