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
-- Table structure for table `feed`
--

DROP TABLE IF EXISTS `feed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feed` (
  `feed_id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`feed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feed`
--

LOCK TABLES `feed` WRITE;
/*!40000 ALTER TABLE `feed` DISABLE KEYS */;
INSERT INTO `feed` VALUES (1,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/72a5a6da-ee79-4770-b713-9ab06a5ee887cricket.png','귀뚜라미'),(2,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/fa1bd174-aa7e-4aa5-952d-4388385d8389ladybug.png','무당벌레'),(3,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/72918b6c-c181-451c-90f5-4f400fba2b11butterfly.png','나비'),(4,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/307b8e87-2122-4621-973c-4bd667f4b741rat.png','쥐'),(5,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/1fbf1b81-14ed-4d33-a859-68d9d443de67snail.png','달팽이'),(6,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/b74e970b-cc22-4968-8e28-7bb797b724a2spider.png','거미'),(7,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/8a105e69-49f6-4fcb-aa50-45a5b6481651worm.png','밀웜'),(8,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/fe55ddc9-61a4-4417-a8be-de6c007f510dcabbage.png','채소'),(9,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/d1a77f4f-279a-4096-b9b3-f9d24b4d962bfeed9.png','사료'),(10,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/7d9c735d-996d-404e-90ca-37e0fec6898dfeed10.png','곤충젤리'),(11,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/fb416590-1000-4d00-9c3a-a96a0198d818feed11.png','과일'),(12,NULL,'2023-02-12 16:49:51.000000',NULL,'2023-02-12 16:50:02.000000','https://marizoo.s3.ap-northeast-2.amazonaws.com/feed/a616a7dd-3714-41ca-846e-e9d13f1a7121feed12.png','올챙이');
/*!40000 ALTER TABLE `feed` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 11:16:12
