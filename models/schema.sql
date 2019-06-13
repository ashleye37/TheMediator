-- use heroku database name
USE ygghtv7acsr0i70p;

CREATE TABLE photos (
  id INT( 11 ) AUTO_INCREMENT NOT NULL PRIMARY KEY,
  primaryPath VARCHAR(55),
  secondPath VARCHAR(55) NOT NULL,
  primaryWins INT NOT NULL DEFAULT 0,
  secondWins INT NOT NULL DEFAULT 0,
  userId VARCHAR(55)
);

CREATE TABLE user (
  userId INT(11) AUTO_INCREMENT NOT NULL,
  googleId INT(30),
  username VARCHAR (30) NOT NULL,
  thumbnail VARCHAR(55),
  basicCount INT NOT NULL DEFAULT 0,
  weirdCount INT NOT NULL DEFAULT 0
);