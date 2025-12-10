CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_id` int NOT NULL,
  `service_id` int NOT NULL,
  `date_given` date NOT NULL,
  `amount_item` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `status` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_transactions_users_users_id_idx` (`user_id`),
  KEY `fk_transactions_persons_persons_id_idx` (`person_id`),
  KEY `fk_transactions_services_services_id_idx` (`service_id`),
  CONSTRAINT `fk_transactions_persons_persons_ id` FOREIGN KEY (`person_id`) REFERENCES `persons` (`id`),
  CONSTRAINT `fk_transactions_services_services_ id` FOREIGN KEY (`service_id`) REFERENCES `service_types` (`id`),
  CONSTRAINT `fk_transactions_users_users_ id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
)