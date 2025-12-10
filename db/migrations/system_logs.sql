CREATE TABLE `system_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `action` varchar(50) NOT NULL,
  `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `affected_id` int NOT NULL,
  `table` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
)