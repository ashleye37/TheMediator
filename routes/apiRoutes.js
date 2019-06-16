var db = require("../models");

module.exports = function(app) {
  // Get all photos
  app.get("/api/photos", function(req, res) {
    db.Photo.find({
      order: [
        Sequelize.fn( 'RAND' ),
      ]
    }).then(function(photos) {
      res.json(photos);
    });
  });

  // Create a new photo
  app.post("/api/photos", function(req, res) {
    db.Photo.create(req.body).then(function(photos) {
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
