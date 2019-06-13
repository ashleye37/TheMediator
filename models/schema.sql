DROP DATABASE IF EXISTS mediator;
CREATE DATABASE mediator;
USE mediator;

CREATE TABLE photos (
  id INT( 11 ) AUTO_INCREMENT NOT NULL,
  primaryPath VARCHAR(55),
  secondPath VARCHAR(55) NOT NULL,
  primaryWins INT NOT NULL DEFAULT 0,
  secondWins INT NOT NULL DEFAULT 0,
  userId VARCHAR(55),
  PRIMARY KEY ( `id` )
);

CREATE TABLE user (
  userId INT(11) AUTO_INCREMENT NOT NULL,
  googleId INT(30),
  username VARCHAR (30) NOT NULL,
  thumbnail VARCHAR(55),
  basicCount INT NOT NULL DEFAULT 0,
  weirdCount INT NOT NULL DEFAULT 0,
  PRIMARY KEY(`userId`)
);