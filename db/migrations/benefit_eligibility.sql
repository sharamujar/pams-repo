CREATE TABLE `benefit_eligibility` (
  `id` int NOT NULL AUTO_INCREMENT,
  `benefit` varchar(150) NOT NULL,
  `status` tinyint NOT NULL,
  `notes` varchar(100) NOT NULL,
  `date_evaluated` date DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
)