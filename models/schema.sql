DROP DATABASE IF EXISTS mediator;
CREATE DATABASE mediator;


CREATE TABLE `photos` (
	`id` INT( 11 ) AUTO_INCREMENT NOT NULL,
	`photoPath` VARCHAR(55) NOT NULL,
	`wins` INT NOT NULL SET DEFAULT 0,
	`losses` INT NOT NULL SET DEFAULT 0,
	`category` VARCHAR(20),
  'pair' BOOLEAN SET DEFAULT false,
  'pairPath' VARCHAR(55),
  'userId' VARCHAR(55),
	PRIMARY KEY ( `id` )
);
