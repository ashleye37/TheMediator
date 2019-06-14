// var Sequelize = require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    username: DataTypes.STRING,
    googleId: DataTypes.STRING,
    thumbnail: DataTypes.STRING
  });
  return User;
};