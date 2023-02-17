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
-- Table structure for table `badge`
--

DROP TABLE IF EXISTS `badge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badge` (
  `badge_id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `badge_type` varchar(255) DEFAULT NULL,
  `cond` int NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`badge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badge`
--

LOCK TABLES `badge` WRITE;
/*!40000 ALTER TABLE `badge` DISABLE KEYS */;
INSERT INTO `badge` VALUES (1,NULL,'2023-02-09 10:19:50.751497',NULL,'2023-02-09 10:19:50.751497','WATCH',1,'누적 시청 1시간','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/7fa81e1e-5357-4558-ad99-6ac334b9e962badgeWATCH1.png'),(2,NULL,'2023-02-09 10:19:50.846186',NULL,'2023-02-09 10:19:50.846186','WATCH',5,'누적 시청 5시간','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/08ee21a2-2ef4-4af9-8b96-32958e771c28badgeWATCH5.png'),(3,NULL,'2023-02-09 10:19:50.940325',NULL,'2023-02-09 10:19:50.940325','WATCH',10,'누적 시청 10시간','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/9617fb7e-508c-4389-b1ae-0d6765c8b304badgeWATCH10.png'),(4,NULL,'2023-02-09 10:19:51.020574',NULL,'2023-02-09 10:19:51.020574','WATCH',20,'누적 시청 20시간','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/cea60b59-eebd-4108-af4b-b8b01a12f711badgeWATCH20.png'),(5,NULL,'2023-02-09 10:19:51.148127',NULL,'2023-02-09 10:19:51.148127','WATCH',30,'누적 시청 30시간','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/7f75d555-6d84-451b-83ab-0f8b62c93642badgeWATCH30.png'),(6,NULL,'2023-02-09 10:19:51.225130',NULL,'2023-02-09 10:19:51.225130','WATCH',50,'누적 시청 50시간','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/ef042693-3448-49f6-9536-d1370f33ddd6badgeWATCH50.png'),(7,NULL,'2023-02-09 10:19:51.316811',NULL,'2023-02-09 10:19:51.316811','WATCH',70,'누적 시청 70시간','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/3b0f0817-f013-4469-b5e0-59eccbfd5e9cbadgeWATCH70.png'),(8,NULL,'2023-02-09 10:19:51.384281',NULL,'2023-02-09 10:19:51.384281','WATCH',100,'누적 시청 100시간','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/b2770505-5e1f-488e-982a-00a6f9d6a697badgeWATCH100.png'),(9,NULL,'2023-02-09 10:19:51.455204',NULL,'2023-02-09 10:19:51.455204','WATCH',200,'누적 시청 200시간','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/47c66e96-639b-4ee0-88db-aa46d07f4f63badgeWATCH200.png'),(10,NULL,'2023-02-09 10:19:51.511866',NULL,'2023-02-09 10:19:51.511866','EFFECT',10,'이펙트 클릭 10번','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/a09e81b9-c5ff-442b-8c16-2e3ee5afc268badgeEFFECT10.png'),(11,NULL,'2023-02-09 10:19:51.603706',NULL,'2023-02-09 10:19:51.603706','EFFECT',50,'이펙트 클릭 50번','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/1fbca949-2b41-4605-bc6b-f59241bac4e7badgeEFFECT50.png'),(12,NULL,'2023-02-09 10:19:51.667657',NULL,'2023-02-09 10:19:51.667657','EFFECT',100,'이펙트 클릭100번','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/1ee91182-0bfc-432e-8a8e-3e871e30347dbadgeEFFECT100.png'),(13,NULL,'2023-02-09 10:19:51.772359',NULL,'2023-02-09 10:19:51.772359','EFFECT',200,'이펙트 클릭 200번','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/2b9e70c3-8976-4c95-bd32-eddec7fc00e1badgeEFFECT200.png'),(14,NULL,'2023-02-09 10:19:51.855254',NULL,'2023-02-09 10:19:51.855254','EFFECT',500,'이펙트 클릭 500번','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/38b41712-074c-44ad-8177-c40303c67c53badgeEFFECT500.png'),(15,NULL,'2023-02-09 10:19:51.936612',NULL,'2023-02-09 10:19:51.936612','EFFECT',1000,'이펙트 클릭 1000번','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/bc6e0e7e-1a35-42f0-9b1e-e51e8415ce38badgeEFFECT1000.png'),(16,NULL,'2023-02-09 10:19:52.064782',NULL,'2023-02-09 10:19:52.064782','EFFECT',2000,'이펙트 클릭 2000번','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/75363e69-c7e8-4080-8d65-8c86bb84f732badgeEFFECT2000.png'),(17,NULL,'2023-02-09 10:19:52.149794',NULL,'2023-02-09 10:19:52.149794','EFFECT',5000,'이펙트 클릭 5000번','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/568f890f-6aef-40a9-86ec-2fd9a2a0896bbadgeEFFECT5000.png'),(18,NULL,'2023-02-09 10:19:52.219283',NULL,'2023-02-09 10:19:52.219283','EFFECT',10000,'이펙트 클릭 10000번','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/e222d17a-6f17-4d7f-aa50-54e94d0cc18fbadgeEFFECT10000.png'),(19,NULL,'2023-02-09 10:19:52.323416',NULL,'2023-02-09 10:19:52.323416','FEED',1,'먹이주기 1회','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/61060a4a-38a7-430f-a34b-db1928defa3ebadgeFEED1.png'),(20,NULL,'2023-02-09 10:19:52.386618',NULL,'2023-02-09 10:19:52.386618','FEED',5,'먹이주기 5회','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/6369044e-a349-4019-8fc5-f63a0faca6e6badgeFEED5.png'),(21,NULL,'2023-02-09 10:19:52.470492',NULL,'2023-02-09 10:19:52.470492','FEED',10,'먹이주기 10회','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/2e9f82d4-d0c8-4cf6-a274-06b8e92d3389badgeFEED10.png'),(22,NULL,'2023-02-09 10:19:52.528162',NULL,'2023-02-09 10:19:52.528162','FEED',15,'먹이주기 15회','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/9d471ed0-eaee-435e-ac90-8c486f8f3551badgeFEED15.png'),(23,NULL,'2023-02-09 10:19:52.646109',NULL,'2023-02-09 10:19:52.646109','FEED',20,'먹이주기 20회','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/6a98653b-7ed2-4c6b-9719-c2ef473db5e2badgeFEED20.png'),(24,NULL,'2023-02-09 10:19:52.705582',NULL,'2023-02-09 10:19:52.705582','FEED',30,'먹이주기 30회','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/3a97c055-b13f-42d3-9637-da681b87845cbadgeFEED30.png'),(25,NULL,'2023-02-09 10:19:52.780621',NULL,'2023-02-09 10:19:52.780621','FEED',50,'먹이주기 50회','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/cac2ab6f-ae52-4d77-9079-0fd025edb043badgeFEED50.png'),(26,NULL,'2023-02-09 10:19:52.899796',NULL,'2023-02-09 10:19:52.899796','FEED',70,'먹이주기 70회','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/38bdd47c-c056-4e0f-809c-2e28efd72340badgeFEED70.png'),(27,NULL,'2023-02-09 10:19:52.966118',NULL,'2023-02-09 10:19:52.966118','FEED',100,'먹이주기 100회','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/9995dc1a-d7e0-42b5-ba0e-495ff344340dbadgeFEED100.png'),(28,NULL,'2023-02-09 10:19:53.019239',NULL,'2023-02-09 10:19:53.019239','BIRTH',1,'부화 방송 시청','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/2f72159c-d8d4-4b05-818f-10d20cf6843ebadgeBIRTH1.png'),(29,NULL,'2023-02-09 10:19:53.079648',NULL,'2023-02-09 10:19:53.079648','BIRTH',2,'부화 방송 시청','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/14e88f53-1887-4940-a7c8-300c8b91a70cbadgeBIRTH2.png'),(30,NULL,'2023-02-09 10:19:53.143315',NULL,'2023-02-09 10:19:53.143315','BIRTH',3,'부화 방송 시청','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/ea5f4fb4-1d6d-4469-8c30-0d23bcb07ad8badgeBIRTH3.png'),(31,NULL,'2023-02-09 10:19:53.262177',NULL,'2023-02-09 10:19:53.262177','BIRTH',4,'부화 방송 시청','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/73c3d1f0-8cbd-43bf-8577-138b0c6e2f37badgeBIRTH4.png'),(32,NULL,'2023-02-09 10:19:53.330948',NULL,'2023-02-09 10:19:53.330948','BIRTH',5,'부화 방송 시청','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/caed1686-2207-454c-a331-70634f9f7119badgeBIRTH5.png'),(33,NULL,'2023-02-09 10:19:53.424864',NULL,'2023-02-09 10:19:53.424864','BIRTH',6,'부화 방송 시청','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/62835078-d8cf-4221-9e9d-36852136f060badgeBIRTH6.png'),(34,NULL,'2023-02-09 10:19:53.484626',NULL,'2023-02-09 10:19:53.484626','BIRTH',7,'부화 방송 시청','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/5eb161c3-8ccd-4d16-845c-471038947edcbadgeBIRTH7.png'),(35,NULL,'2023-02-09 10:19:53.573771',NULL,'2023-02-09 10:19:53.573771','BIRTH',8,'부화 방송 시청','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/b57ccfd8-fae5-4cbe-bdbf-3f6099950982badgeBIRTH8.png'),(36,NULL,'2023-02-09 10:19:53.631861',NULL,'2023-02-09 10:19:53.631861','BIRTH',9,'부화 방송 시청','https://marizoo.s3.ap-northeast-2.amazonaws.com/badge/4aa5abc7-dd94-4425-9aed-1d2a86515f01badgeBIRTH9.png');
/*!40000 ALTER TABLE `badge` ENABLE KEYS */;
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
