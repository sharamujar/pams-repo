CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_id` int NOT NULL,
  `service_id` varchar(20) NOT NULL,
  `preferred_date` date NOT NULL,
  `status` tinyint NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
) 