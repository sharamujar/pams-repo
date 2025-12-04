CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `posted_by` int NOT NULL,
  `date_posted` date NOT NULL,
  `status` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk__idx` (`posted_by`),
  CONSTRAINT `fk_announcements_users_posted_by` FOREIGN KEY (`posted_by`) REFERENCES `users` (`id`)
) 