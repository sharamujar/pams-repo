CREATE TABLE `pwd_masterlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` char(1) NOT NULL,
  `disability_type` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `contact_no` varchar(20) DEFAULT NULL,
  `status` tinyint NOT NULL,
  `date_registered` date NOT NULL,
  PRIMARY KEY (`id`)
)