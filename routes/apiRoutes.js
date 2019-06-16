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
  app.put("/api/photos", function (req, res) {
    //get current win totals
    db.Photo.findAll({
      where: {
        id: req.body.id
      }
    }).then(function (data) {
      console.log("Data: ");
      console.log(data[0].id);

      //if left won, add 1 and update primary wins
      if (req.body.winner === "left") {
        var newWins = data[0].primaryWins + 1;
        db.Photo.update(
          { primaryWins: newWins },
          { where: { id: req.body.id } }).then(function (photos) {
            res.json(photos);
          });
      } else if (req.body.winner === "right") {
        var newWins = data[0].secondWins + 1;
        db.Photo.update(
          { secondWins: newWins },
          { where: { id: req.body.id } }).then(function (photos) {
            res.json(photos);
          });
      }
    });
  });
};
