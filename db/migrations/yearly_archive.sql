CREATE TABLE `yearly_archive` (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` int NOT NULL,
  `total_person_served` int NOT NULL,
  `total_assistance_given` int NOT NULL,
  `total_amount` varchar(255) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
)