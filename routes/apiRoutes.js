var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/photos", function(req, res) {
    db.Photo.findOne({
      order: [
        Sequelize.fn( 'RAND' ),
      ]
    }).then(function(photos) {
      res.json(photos);
    });
  });

  // Create a new example
  app.post("/api/photos", function(req, res) {
    db.Photo.create(req.body).then(function(photos) {
      res.json(photos);
    });
  });
};
