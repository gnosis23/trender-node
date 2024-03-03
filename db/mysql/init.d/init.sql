CREATE DATABASE IF NOT EXISTS `trender` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `trender`;

CREATE TABLE `repository` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `language` VARCHAR(64) NULL,
  `owner_name` VARCHAR(64) NULL,
  `owner_url` VARCHAR(128) NULL,
  `name` VARCHAR(64) NOT NULL,
  `star` INT NULL DEFAULT 0,
  `description` VARCHAR(256) NULL,
  `url` VARCHAR(256) NULL,
  `created` TIMESTAMP NULL,
  PRIMARY KEY (`id`));
