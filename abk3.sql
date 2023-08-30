-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for abk
DROP DATABASE IF EXISTS `abk`;
CREATE DATABASE IF NOT EXISTS `abk` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `abk`;

-- Dumping structure for table abk.definition
DROP TABLE IF EXISTS `definition`;
CREATE TABLE IF NOT EXISTS `definition` (
  `definition_id` int(11) NOT NULL AUTO_INCREMENT,
  `definition_text` text NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `link` varchar(500) DEFAULT NULL,
  `stat` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`definition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=907 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table abk.definition_short_name
DROP TABLE IF EXISTS `definition_short_name`;
CREATE TABLE IF NOT EXISTS `definition_short_name` (
  `definition_id` int(11) NOT NULL,
  `short_name_id` int(11) NOT NULL,
  PRIMARY KEY (`definition_id`,`short_name_id`),
  KEY `short_name_id` (`short_name_id`),
  CONSTRAINT `definition_short_name_ibfk_1` FOREIGN KEY (`definition_id`) REFERENCES `definition` (`definition_id`),
  CONSTRAINT `definition_short_name_ibfk_2` FOREIGN KEY (`short_name_id`) REFERENCES `short_name` (`short_name_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table abk.definition_subject
DROP TABLE IF EXISTS `definition_subject`;
CREATE TABLE IF NOT EXISTS `definition_subject` (
  `definition_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  PRIMARY KEY (`definition_id`,`subject_id`),
  KEY `subject_id` (`subject_id`),
  CONSTRAINT `definition_subject_ibfk_1` FOREIGN KEY (`definition_id`) REFERENCES `definition` (`definition_id`),
  CONSTRAINT `definition_subject_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table abk.definition_theme
DROP TABLE IF EXISTS `definition_theme`;
CREATE TABLE IF NOT EXISTS `definition_theme` (
  `definition_id` int(11) NOT NULL,
  `theme_id` int(11) NOT NULL,
  PRIMARY KEY (`definition_id`,`theme_id`),
  KEY `theme_id` (`theme_id`),
  CONSTRAINT `definition_theme_ibfk_1` FOREIGN KEY (`definition_id`) REFERENCES `definition` (`definition_id`),
  CONSTRAINT `definition_theme_ibfk_2` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`theme_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table abk.long_name
DROP TABLE IF EXISTS `long_name`;
CREATE TABLE IF NOT EXISTS `long_name` (
  `long_name_id` int(11) NOT NULL AUTO_INCREMENT,
  `long_name_text` varchar(255) NOT NULL,
  PRIMARY KEY (`long_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=954 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table abk.short_name
DROP TABLE IF EXISTS `short_name`;
CREATE TABLE IF NOT EXISTS `short_name` (
  `short_name_id` int(11) NOT NULL AUTO_INCREMENT,
  `short_name_text` varchar(100) NOT NULL,
  PRIMARY KEY (`short_name_id`)
) ENGINE=InnoDB AUTO_INCREMENT=958 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table abk.short_name_long_name
DROP TABLE IF EXISTS `short_name_long_name`;
CREATE TABLE IF NOT EXISTS `short_name_long_name` (
  `short_name_id` int(11) NOT NULL,
  `long_name_id` int(11) NOT NULL,
  PRIMARY KEY (`short_name_id`,`long_name_id`),
  KEY `long_name_id` (`long_name_id`),
  CONSTRAINT `short_name_long_name_ibfk_1` FOREIGN KEY (`short_name_id`) REFERENCES `short_name` (`short_name_id`),
  CONSTRAINT `short_name_long_name_ibfk_2` FOREIGN KEY (`long_name_id`) REFERENCES `long_name` (`long_name_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table abk.subject
DROP TABLE IF EXISTS `subject`;
CREATE TABLE IF NOT EXISTS `subject` (
  `subject_id` int(11) NOT NULL AUTO_INCREMENT,
  `subject_name` varchar(100) NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table abk.theme
DROP TABLE IF EXISTS `theme`;
CREATE TABLE IF NOT EXISTS `theme` (
  `theme_id` int(11) NOT NULL AUTO_INCREMENT,
  `theme_name` varchar(100) NOT NULL,
  PRIMARY KEY (`theme_id`)
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table abk.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `username` varchar(255) NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `PASSWORD` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
