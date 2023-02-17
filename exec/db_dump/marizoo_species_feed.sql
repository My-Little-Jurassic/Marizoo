-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 3.36.112.78    Database: marizoo
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `species_feed`
--

DROP TABLE IF EXISTS `species_feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `species_feed` (
  `species_feed_id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `feed_id` bigint DEFAULT NULL,
  `species_id` bigint DEFAULT NULL,
  PRIMARY KEY (`species_feed_id`),
  KEY `FK7qcmw35k7cnj0p577iavlty7a` (`feed_id`),
  KEY `FK9saem3d2b1kypm282qow8ank6` (`species_id`),
  CONSTRAINT `FK7qcmw35k7cnj0p577iavlty7a` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`feed_id`),
  CONSTRAINT `FK9saem3d2b1kypm282qow8ank6` FOREIGN KEY (`species_id`) REFERENCES `species` (`species_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species_feed`
--

LOCK TABLES `species_feed` WRITE;
/*!40000 ALTER TABLE `species_feed` DISABLE KEYS */;
INSERT INTO `species_feed` VALUES (1,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',1,1),(2,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',6,1),(3,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',10,1),(4,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',11,1),(5,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',1,2),(6,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',4,2),(7,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',6,2),(8,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',10,2),(9,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',11,2),(10,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',1,3),(11,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',6,3),(12,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',7,3),(13,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',12,3),(14,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',8,4),(15,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',11,4),(16,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',4,5),(17,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',1,6),(18,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',3,6),(19,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',5,6),(20,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',6,6),(21,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',8,6),(22,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',1,7),(23,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',6,7),(24,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',10,7),(25,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',8,8),(26,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',9,8),(27,'seunghee','2023-02-12 16:50:40.000000','seunghee','2023-02-12 16:50:29.000000',11,8);
/*!40000 ALTER TABLE `species_feed` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 11:16:09
