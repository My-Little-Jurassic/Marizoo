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
-- Table structure for table `broadcast_animal`
--

DROP TABLE IF EXISTS `broadcast_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `broadcast_animal` (
  `broadcast_animal_id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `classification` varchar(255) DEFAULT NULL,
  `classification_img` varchar(255) DEFAULT NULL,
  `animal_id` bigint DEFAULT NULL,
  `broadcast_id` bigint DEFAULT NULL,
  PRIMARY KEY (`broadcast_animal_id`),
  KEY `FKie2alrs8d22slsswxgi49l0pv` (`animal_id`),
  KEY `FK4sp9a7l49twxdbsbktqv9phfq` (`broadcast_id`),
  CONSTRAINT `FK4sp9a7l49twxdbsbktqv9phfq` FOREIGN KEY (`broadcast_id`) REFERENCES `broadcast` (`broadcast_id`),
  CONSTRAINT `FKie2alrs8d22slsswxgi49l0pv` FOREIGN KEY (`animal_id`) REFERENCES `animal` (`animal_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `broadcast_animal`
--

LOCK TABLES `broadcast_animal` WRITE;
/*!40000 ALTER TABLE `broadcast_animal` DISABLE KEYS */;
INSERT INTO `broadcast_animal` VALUES (1,NULL,'2023-02-16 12:24:18.635428',NULL,'2023-02-16 12:24:18.635428','표범 도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/3d1718ba-069b-4863-a2c6-ca9c0460fc4fLeopardGecko.jpg',29,1),(2,NULL,'2023-02-16 12:26:30.791139',NULL,'2023-02-16 12:26:30.791139','카멜레온','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/31ec8f80-7507-4547-95b4-4a6e69335b3cChamaeleonidae.jpg',15,2),(3,NULL,'2023-02-16 13:08:50.034953',NULL,'2023-02-16 13:08:50.034953','거북','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/tuttle.jpg',61,3),(4,NULL,'2023-02-16 13:24:57.203889',NULL,'2023-02-16 13:24:57.203889','도롱뇽','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/bd84aff5-fca4-4f9d-9dec-ab240acb150cDumeril.jpg',19,4),(5,NULL,'2023-02-16 14:26:58.820148',NULL,'2023-02-16 14:26:58.820148','카멜레온','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/31ec8f80-7507-4547-95b4-4a6e69335b3cChamaeleonidae.jpg',48,5),(6,NULL,'2023-02-16 14:29:51.095347',NULL,'2023-02-16 14:29:51.095347','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',59,6),(7,NULL,'2023-02-16 14:31:30.758307',NULL,'2023-02-16 14:31:30.758307','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',57,7),(8,NULL,'2023-02-16 14:33:01.894118',NULL,'2023-02-16 14:33:01.894118','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',58,8),(9,NULL,'2023-02-16 15:19:37.358418',NULL,'2023-02-16 15:19:37.358418','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',59,9),(10,NULL,'2023-02-16 15:28:01.994078',NULL,'2023-02-16 15:28:01.994078','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',59,10),(11,NULL,'2023-02-16 15:30:42.439336',NULL,'2023-02-16 15:30:42.439336','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',59,11),(12,NULL,'2023-02-16 15:32:25.861492',NULL,'2023-02-16 15:32:25.861492','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',59,12),(13,NULL,'2023-02-16 15:33:25.180147',NULL,'2023-02-16 15:33:25.180147','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',59,13),(14,NULL,'2023-02-16 15:34:16.309772',NULL,'2023-02-16 15:34:16.309772','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',59,14),(15,NULL,'2023-02-16 22:39:40.653996',NULL,'2023-02-16 22:39:40.653996','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',57,15),(17,NULL,'2023-02-16 22:46:38.379116',NULL,'2023-02-16 22:46:38.379116','거북','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/tuttle.jpg',62,17),(18,NULL,'2023-02-17 00:38:25.347130',NULL,'2023-02-17 00:38:25.347130','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',60,18),(19,NULL,'2023-02-17 00:42:35.423937',NULL,'2023-02-17 00:42:35.423937','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png',58,19),(20,NULL,'2023-02-17 01:26:22.806053',NULL,'2023-02-17 01:26:22.806053','거북','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/tuttle.jpg',63,20),(21,NULL,'2023-02-17 01:43:14.800139',NULL,'2023-02-17 01:43:14.800139','표범 도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/3d1718ba-069b-4863-a2c6-ca9c0460fc4fLeopardGecko.jpg',27,21),(22,NULL,'2023-02-17 01:45:43.385596',NULL,'2023-02-17 01:45:43.385596','도롱뇽','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/bd84aff5-fca4-4f9d-9dec-ab240acb150cDumeril.jpg',19,22);
/*!40000 ALTER TABLE `broadcast_animal` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 11:16:11
