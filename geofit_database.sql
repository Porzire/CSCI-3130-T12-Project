SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `geofit` DEFAULT CHARACTER SET utf8 ;
USE `geofit` ;

-- -----------------------------------------------------
-- Table `geofit`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geofit`.`activity` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `activity_name` VARCHAR(20) NULL DEFAULT NULL,
  `cal_burned` INT(11) NULL DEFAULT NULL,
  `date_burned` DATE NULL DEFAULT NULL,
  `date_added` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `geofit`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geofit`.`item` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NULL DEFAULT NULL,
  `item_name` VARCHAR(20) NULL DEFAULT NULL,
  `cal_consumed` INT(11) NULL DEFAULT NULL,
  `date_consumed` DATE NULL DEFAULT NULL,
  `date_added` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = MyISAM
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `geofit`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `geofit`.`login` (
  `username` CHAR(20) NOT NULL,
  `password` CHAR(20) NOT NULL,
  PRIMARY KEY (`username`))
ENGINE = MyISAM
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
