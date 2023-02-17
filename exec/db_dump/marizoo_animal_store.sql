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
-- Table structure for table `animal_store`
--

DROP TABLE IF EXISTS `animal_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal_store` (
  `animal_store_id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `opening_hours` varchar(255) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `store_name` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`animal_store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_store`
--

LOCK TABLES `animal_store` WRITE;
/*!40000 ALTER TABLE `animal_store` DISABLE KEYS */;
INSERT INTO `animal_store` VALUES (1,NULL,'2023-02-09 10:19:54.996962',NULL,'2023-02-09 10:19:54.996962','충남 천안시 서북구 공원로 196 모다아울렛 1층','','',36.7984,127.102,'11:00 ~ 21:00','https://marizoo.s3.ap-northeast-2.amazonaws.com/owner/06678417-29b5-45a4-a8d3-731755eb082daupooaupoo.jpg','어푸어푸 천안모다아울렛점','070-8730-1200'),(2,NULL,'2023-02-09 10:19:55.157322',NULL,'2023-02-09 10:19:55.157322','강원 강릉시 대학길 3 2층','','',37.7536,128.897,'11:00 ~ 20:00','https://marizoo.s3.ap-northeast-2.amazonaws.com/owner/7982da0d-73cf-4fcd-9ed3-c133a775d6a6bibian.jpg','파충류카페 비비안','010-6655-8625'),(3,NULL,'2023-02-09 10:19:55.348084',NULL,'2023-02-09 10:19:55.348084','대구 남구 용두길 16','','',35.8342,128.605,'10:00 ~ 22:00','https://marizoo.s3.ap-northeast-2.amazonaws.com/owner/891fef91-c373-464d-937a-f91f4080744amillim.jpg','MILLIM','0507-1380-0534'),(4,NULL,'2023-02-09 10:19:55.494826',NULL,'2023-02-09 10:19:55.494826','경기 성남시 수정구 창업로 18 파미어스몰 B1 카페거부기 앤 쿠펫','','',37.4136,127.098,'11:00 ~ 20:00','https://marizoo.s3.ap-northeast-2.amazonaws.com/owner/0b952a5c-8094-4e36-9a32-11ca6d709fb0cafeGueBuGgi.jpg','Cafe거부기 앤 쿠펫 판교점','0507-1376-1753'),(5,NULL,'2023-02-09 10:19:55.598641',NULL,'2023-02-09 10:19:55.598641','경기 수원시 영통구 덕영대로 1566 판타지움 3층','','',37.2452,127.062,'11:00 ~ 20:00','https://marizoo.s3.ap-northeast-2.amazonaws.com/owner/57f9a6f4-1eaa-4cc3-b8a4-5a6867b9e2f1aupooaupoo-suwon.jpg','어푸어푸 수원판타지움점','0507-1387-1179'),(6,NULL,'2023-02-09 10:19:55.668662',NULL,'2023-02-09 10:19:55.668662','경기 고양시 일산동구 정발산로 24 웨스턴돔, 2층','','',37.6554,126.772,'11:00 ~ 21:00','https://marizoo.s3.ap-northeast-2.amazonaws.com/owner/0a10cedc-b8cd-403b-86e7-d9110f51f666djurassic.jpg','디쥬라기','0507-1329-2779'),(7,'seunghee','2023-02-16 00:45:29.000000','seunghee','2023-02-16 11:30:13.227458','대전 유성구 동서대로 98-39','안녕하세요~~','ssaft@ssafy.com',36.3553,127.298,'09:00 ~ 18:00','https://marizoo.s3.ap-northeast-2.amazonaws.com/animal/c202c67c-910e-4626-a2dd-cab63ed8583banimalStore7.png','싸피 파충류샵','042-1329-2779');
/*!40000 ALTER TABLE `animal_store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 11:16:10
