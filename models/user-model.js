// var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    username: DataTypes.String,
    googleId: DataTypes.String,
    thumbnail: DataTypes.String
  });
  return User;
};