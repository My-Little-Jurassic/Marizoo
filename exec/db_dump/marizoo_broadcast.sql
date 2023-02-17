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
-- Table structure for table `broadcast`
--

DROP TABLE IF EXISTS `broadcast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `broadcast` (
  `broadcast_id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `end_time` datetime(6) DEFAULT NULL,
  `start_time` datetime(6) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `animal_store_id` bigint DEFAULT NULL,
  `vote_id` bigint DEFAULT NULL,
  `session_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`broadcast_id`),
  KEY `FKguuqwyjkdxmb97ygunfntd15s` (`animal_store_id`),
  KEY `FKdajajh2mqh33285sjrifqn21x` (`vote_id`),
  CONSTRAINT `FKdajajh2mqh33285sjrifqn21x` FOREIGN KEY (`vote_id`) REFERENCES `vote` (`vote_id`),
  CONSTRAINT `FKguuqwyjkdxmb97ygunfntd15s` FOREIGN KEY (`animal_store_id`) REFERENCES `animal_store` (`animal_store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `broadcast`
--

LOCK TABLES `broadcast` WRITE;
/*!40000 ALTER TABLE `broadcast` DISABLE KEYS */;
INSERT INTO `broadcast` VALUES (1,NULL,'2023-02-16 12:24:18.632705',NULL,'2023-02-16 12:24:48.660046','ㅁ','2023-02-16 12:24:48.656437','2023-02-16 12:24:18.632318','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/bc4aa370-b018-4aa6-aa90-51e4e1e01b0a%EB%8F%84%EB%A7%88%EB%B1%80.avif','도마뱀 탈피 방송',3,NULL,'ses_D7TSExKOeP'),(2,NULL,'2023-02-16 12:26:30.788512',NULL,'2023-02-16 17:04:22.169828','달립니다','2023-02-16 17:04:22.165560','2023-02-16 12:26:30.788165','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/2d4d828c-3bb8-477f-ac40-b83a69cbd057beautiful-green-iguana-closeup-wood.jpg','발표연습 켠왕',3,2,'ses_Z1tE3ssd4D'),(3,NULL,'2023-02-16 13:08:50.032556',NULL,'2023-02-16 13:28:05.155982','안녕 꼬부기','2023-02-16 13:28:05.152125','2023-02-16 13:08:50.032223','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/e5469885-e3db-4e57-bc2a-5ec9046edef0animal61.jpg','우리 귀여운 꼬부기',7,NULL,'ses_JbW4lYPatr'),(4,NULL,'2023-02-16 13:24:57.201390',NULL,'2023-02-16 13:25:42.597653','ㅁㄴㅇㄹㅁㄴㅇㄹ','2023-02-16 13:25:42.593503','2023-02-16 13:24:57.200800','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/77a6242f-d4ab-4a0b-9839-2e5012d9365920230210123925657_I4RL7S5J.png','음소거설정',3,NULL,'ses_OIMLlJCSrX'),(5,NULL,'2023-02-16 14:26:58.817123',NULL,'2023-02-16 16:26:04.785451','진짜 귀여운 우리 레온이 낮잠 자는 모습 보세요','2023-02-16 16:26:04.781244','2023-02-16 14:26:58.816805','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/fac6877f-0b0f-4aff-bf05-4c45897518e8chamaeleon_reo.png','우리 레온이가 낮잠을 자요.',5,NULL,'ses_GBcK6Jp7ox'),(6,NULL,'2023-02-16 14:29:51.092636',NULL,'2023-02-16 15:17:54.907557','도마뱀이 먹이를 먹고 있어요\n좋아요 많이 눌러주세요 :)','2023-02-16 15:17:54.903666','2023-02-16 14:29:51.092333','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/0b5c46da-bed1-4c56-a331-e57a243cd9dc1.jpg','도마뱀이 먹이 먹는 방송',7,NULL,'ses_EL2f5kR2fa'),(7,NULL,'2023-02-16 14:31:30.755855',NULL,'2023-02-16 17:04:27.595055','ㅁ','2023-02-16 17:04:27.591402','2023-02-16 14:31:30.755542','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/b1efd82c-e3b0-49ed-a95c-3fc22bd861582.jpeg','저희 도마뱀 보러 오세요~',7,NULL,'ses_Qkuv6pxP0m'),(8,NULL,'2023-02-16 14:33:01.891576',NULL,'2023-02-16 16:30:34.158990','귀여운 우리 헤이 좀 봐주세요 젭알','2023-02-16 16:30:34.154977','2023-02-16 14:33:01.891222','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/db8680bf-6df4-4cdc-a1a0-8e1dbfa7ecdaanimal57.jpg','헤이는 귀여워',5,NULL,'ses_Mc07VGdPW8'),(9,NULL,'2023-02-16 15:19:37.355908',NULL,'2023-02-16 15:27:13.057228','도마뱀이 먹이를 먹고 있어요\n좋아요 많이 눌러주세요 :)','2023-02-16 15:27:13.053276','2023-02-16 15:19:37.355584','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/6ff13684-91c9-4d5c-8892-f3ba27c321d11.jpg','도마뱀이 먹이 먹는 방송',7,1,'ses_HVZXY4FgRS'),(10,NULL,'2023-02-16 15:28:01.991638',NULL,'2023-02-16 15:30:27.360114','도마뱀이 먹이를 먹고 있어요\n좋아요 많이 눌러주세요 :)','2023-02-16 15:30:27.356085','2023-02-16 15:28:01.991315','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/4ad95e70-4a25-466c-a5ca-28b00bc4057c1.jpg','도마뱀이 먹이 먹는 방송',7,NULL,'ses_JgwyUWuF3y'),(11,NULL,'2023-02-16 15:30:42.436919',NULL,'2023-02-16 15:31:51.676168','도마뱀이 먹이를 먹고 있어요\n좋아요 많이 눌러주세요 :)','2023-02-16 15:31:51.672620','2023-02-16 15:30:42.436605','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/f5d45bfb-ae99-4c35-ba9a-b9f587c1b4a21.jpg','도마뱀이 먹이 먹는 방송',7,NULL,'ses_AQ69eM1bz2'),(12,NULL,'2023-02-16 15:32:25.858922',NULL,'2023-02-16 15:33:09.173451','도마뱀이 먹이를 먹고 있어요\n좋아요 많이 눌러주세요 :)','2023-02-16 15:33:09.169316','2023-02-16 15:32:25.858349','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/5f30c4fe-8806-4ca6-af27-2c453a432ace1.jpg','도마뱀이 먹이 먹는 방송',7,NULL,'ses_ESl7BwkvOT'),(13,NULL,'2023-02-16 15:33:25.177819',NULL,'2023-02-16 15:33:57.700376','도마뱀이 먹이를 먹고 있어요\n좋아요 많이 눌러주세요 :)','2023-02-16 15:33:57.695938','2023-02-16 15:33:25.177517','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/ec510d19-cd4e-4bfc-aece-51d7244a2ecf1.jpg','도마뱀이 먹이 먹는 방송',7,NULL,'ses_AXDBBC7z2T'),(14,NULL,'2023-02-16 15:34:16.307476',NULL,'2023-02-16 17:04:15.957262','도마뱀이 먹이를 먹고 있어요\n좋아요 많이 눌러주세요 :)','2023-02-16 17:04:15.953429','2023-02-16 15:34:16.307166','FINISH','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/75a5a1cc-c242-4c1a-80a2-6ae080a5a67e1.jpg',' 도마뱀이 먹이 먹는 방송',7,NULL,'ses_Pv2wCRVuz8'),(15,NULL,'2023-02-16 22:39:40.651683',NULL,'2023-02-16 22:39:40.651683','관우처럼 듬직한 우리 관우 멋지죠?',NULL,'2023-02-16 22:39:40.651271','ONAIR','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/a59b4078-8bde-4b8b-97df-2412b6ec9038IMG_0441.JPG','관우의 일상방송 라이브',7,NULL,'ses_K4mHg2DwVD'),(17,NULL,'2023-02-16 22:46:38.376891',NULL,'2023-02-16 22:46:38.376891','귀여운 제리의 일상방송',NULL,'2023-02-16 22:46:38.376605','ONAIR','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/1590479a-2a87-4db1-91b3-243b6e60a069IMG_0443.JPG','귀여운 제리 일상 구경하세요!',7,NULL,'ses_E80FRKcPcF'),(18,NULL,'2023-02-17 00:38:25.344472',NULL,'2023-02-17 00:38:25.344472','우리 귀여운 이즈 좀 제발 봐주세요!!!!!!',NULL,'2023-02-17 00:38:25.344138','ONAIR','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/fe513cf4-163f-4dd0-b50a-9d54a73c115canimal60.jpg','우리 이즈는 귀여워',5,NULL,'ses_Lu5HY2KsOB'),(19,NULL,'2023-02-17 00:42:35.421774',NULL,'2023-02-17 00:42:35.421774','우리 헤이 밥 먹어야해!!!!\n구경해줘!!!!!!',NULL,'2023-02-17 00:42:35.421353','ONAIR','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/5006f691-7686-45b2-9c73-cf3ed0259daaanimal59.jpg','헤이는 밥을 먹어요',5,NULL,'ses_DA2c3RdOTn'),(20,NULL,'2023-02-17 01:26:22.803793',NULL,'2023-02-17 01:26:22.803793','슬리데린에 들어가고 싶어요',NULL,'2023-02-17 01:26:22.803486','ONAIR','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/a49162cb-2ccf-43d8-8cb3-2fae119b97d6%EA%B1%B0%EB%B6%81%EC%9D%B4.jpg','느릿느릿 우리 포스',5,NULL,'ses_KPJN18c7hQ'),(21,NULL,'2023-02-17 01:43:14.797702',NULL,'2023-02-17 01:43:14.797702','쪼꼬만 우리 케이',NULL,'2023-02-17 01:43:14.797349','ONAIR','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/064d173c-9fe3-4ef4-8694-9c82a4473206geckos_od.jpg','귀여운 우리 케이는 쪼꼬매요',7,NULL,'ses_WCPYSUfv92'),(22,NULL,'2023-02-17 01:45:43.383433',NULL,'2023-02-17 01:45:43.383433','우리 루루 귀여운 우리 애기',NULL,'2023-02-17 01:45:43.383036','ONAIR','https://marizoo.s3.ap-northeast-2.amazonaws.com/broadcast/d574b140-409d-42ca-8666-1a085d9a2accsalamander_rr.jpg','루루는 귀여운 도롱뇽이에영',3,NULL,'ses_W3DwkJG1Y8');
/*!40000 ALTER TABLE `broadcast` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17 11:16:14
