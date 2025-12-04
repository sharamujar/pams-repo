CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `posted_by` int NOT NULL,
  `date_posted` date NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_appointments_users_posted_by_idx` (`posted_by`),
  CONSTRAINT `fk_appointments_users_posted_by` FOREIGN KEY (`posted_by`) REFERENCES `users` (`id`)
) 