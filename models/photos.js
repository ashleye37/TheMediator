module.exports = function(sequelize, DataTypes) {
  var Photo = sequelize.define("Photo", {
    primaryPath: DataTypes.STRING,
    secondPath: DataTypes.STRING,
    primaryWins: DataTypes.INTEGER,
    secondWins: DataTypes.INTEGER,
    userId: DataTypes.STRING
  });
  return Photo;
};
