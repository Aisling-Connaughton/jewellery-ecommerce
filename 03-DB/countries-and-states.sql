USE `jewellery-ecommerce`;

SET foreign_key_checks = 0;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;

CREATE TABLE `country` (
  `id` smallint unsigned NOT NULL,
  `code` varchar(2) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Data for table `country`
--

INSERT INTO `country` VALUES 
(1,'ROI','Republic of Ireland'),
(2,'NI','Northern Ireland');

--
-- Table structure for table `county`
--

DROP TABLE IF EXISTS `county`;

CREATE TABLE `county` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `country_id` smallint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_country` (`country_id`),
  CONSTRAINT `fk_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1;

--
-- Dumping data for table `county`
--

INSERT INTO `county` VALUES 
(1,'Carlow',1),
(2,'Cavan',1),
(3,'Clare',1),
(4,'Cork',1),
(5,'Donegal',1),
(6,'Dublin',1),
(7,'Galway',1),
(8,'Kerry',1),
(9,'Kildare',1),
(10,'Kilkenny',1),
(11,'Laois',1),
(12,'Leitrim',1),
(13,'Limerick',1),
(14,'Longford',1),
(15,'Louth',1),
(16,'Mayo',1),
(17,'Meath',1),
(18,'Monaghan',1),
(19,'Offaly',1),
(20,'Roscommon',1),
(21,'Sligo',1),
(22,'Tipperary',1),
(23,'Waterford',1),
(24,'Westmeath',1),
(25,'Wexford',1),
(26,'Wicklow',1),
(27,'Antrim',2),
(28,'Armagh',2),
(29,'Derry',2),
(30,'Down',2),
(31,'Fermanagh',2),
(32,'Tyrone',2);

SET foreign_key_checks = 1;