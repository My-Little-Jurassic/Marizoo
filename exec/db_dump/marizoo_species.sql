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
-- Table structure for table `species`
--

DROP TABLE IF EXISTS `species`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `species` (
  `species_id` bigint NOT NULL AUTO_INCREMENT,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `classification` varchar(255) DEFAULT NULL,
  `classification_img` varchar(255) DEFAULT NULL,
  `habitat` varchar(255) DEFAULT NULL,
  `info` varchar(255) DEFAULT NULL,
  `life_span` int DEFAULT NULL,
  `classification_icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`species_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `species`
--

LOCK TABLES `species` WRITE;
/*!40000 ALTER TABLE `species` DISABLE KEYS */;
INSERT INTO `species` VALUES (1,NULL,'2023-02-09 21:05:29.710763',NULL,'2023-02-14 23:21:37.439688','목도리 도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/cbeae15b-21f6-47b1-b047-d77e64e03fccFrilledlizard.png','오스트레일리아 북부 및 뉴기니 남부의 사바나','저의 몸 길이는 약 50cm~90cm에요. 저는 낮에 주로 활동해요 그리고 대부분의 시간을 나무 위에서 보내요. 목에 목도리와 같은 주름 장식이 달려있어요. 위협을 받았을 때, 암컷을 유혹할 때, 체온을 조절할 때 주름 장식을 펼쳐요. 주름 장식은 30cm 정도 돼요.',13,'https://marizoo.s3.ap-northeast-2.amazonaws.com/species/8d43916e-884d-46af-a06a-a9271ddfd6eaSpeciesIcon1.svg'),(2,NULL,'2023-02-09 21:05:29.861513',NULL,'2023-02-14 23:21:37.452727','표범 도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/3d1718ba-069b-4863-a2c6-ca9c0460fc4fLeopardGecko.jpg','인도, 파키스탄, 아프가니스탄, 네팔, 이란의 바위사막','저의 몸 길이는 약 20cm~28cm에요. 저는 표범을 연상케 하는 점무늬를 가지고 있어 레오파드 게코라고 불려요. 다른 도마뱀과 달리 눈꺼풀이 있고, 발에 빨판이 없어서 매끄러운 곳을 갈 수 없어요. 다리는 짧지만 민첩하고 재빠르게 움직일 수 있어요. 짧은 꼬리로 나뭇가지와 바위도 탈 수 있어요.',15,'https://marizoo.s3.ap-northeast-2.amazonaws.com/species/a6ebb62b-170a-49e8-8601-54648b7a8d0dSpeciesIcon2.svg'),(3,NULL,'2023-02-09 21:05:29.950624',NULL,'2023-02-14 23:21:37.453688','도롱뇽','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/bd84aff5-fca4-4f9d-9dec-ab240acb150cDumeril.jpg','한반도, 중국','저는 겁이 많고 순해서 사람들에게 거의 해를 끼치지 않아요. 저는 어렸을 때, 아가미가 있지만 변태를 하며 아가미가 사라지고 다리가 자라나요. 물에서만 사는 도롱뇽과 땅에서만 사는 도롱뇽, 물과 땅에 모두 사는 도롱뇽이 있어요.',10,'https://marizoo.s3.ap-northeast-2.amazonaws.com/species/2c6620da-9502-4338-9635-05b50de5b59aSpeciesIcon3.svg'),(4,NULL,'2023-02-09 21:05:30.022927',NULL,'2023-02-14 23:21:37.453688','이구아나','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/6a5b16dc-c4bc-4b19-b2a1-8f102e628a39Iguana.jpg','멕시코, 중앙&남아메리카, 카리브해 지역 및 폴리네시아(피지, 통가 등)','저는 다 자라면 웬만한 사람 키보다 길이가 길어요. 시력이 좋아서 모양과 색상을 분간할 수 있어요. 저는 똑똑해서 먹이를 주는 사람을 알아볼 수 있어요. 저는 까칠하고 뾰족한 외형을 가지고 있지만 폭신한 촉감을 좋아해요. 편안하고 기분이 좋으면 뒷다리와 앞다리 다 쭉 펴고 엎어지는데 엄청 귀여워요.',15,'https://marizoo.s3.ap-northeast-2.amazonaws.com/species/4946245a-0ed7-442c-890d-d3b63b851310SpeciesIcon4.svg'),(5,NULL,'2023-02-09 21:05:30.088292',NULL,'2023-02-14 23:21:37.453688','공비단뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/82a39cba-ef62-4c6a-84d8-23e7d05621e2PythonRegius.jpg','서아프리카와 중앙아프리카','저는 115 cm ~ 190cm의 길이를 가져요. 다른 뱀들보다 작은 몸집을 가지고 있어요. 저는 굉장히 얌전하고 겁쟁이에요. 저는 스트레스를 받거나 겁에 질리면 몸을 돌돌 말아 머리를 숨겨서 공 모양으로 말아서 방어해요.',10,'https://marizoo.s3.ap-northeast-2.amazonaws.com/species/dc955f05-30c8-43c5-9873-c9b597bd90a6SpeciesIcon5.svg'),(6,NULL,'2023-02-09 21:05:30.146022',NULL,'2023-02-14 23:21:37.453688','카멜레온','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/31ec8f80-7507-4547-95b4-4a6e69335b3cChamaeleonidae.jpg','아프리카의 정글 같은 열대 지방','저는 15cm ~ 30cm까지 자랄 수 있어요. 저는 빛의 노출과 주위 온도, 감정에 따라 피부 색이 변해요. 저는 눈을 각각 360도로 굴릴 수 있어 대부분의 방향을 볼 수 있어요. 눈으로 먹이의 위치를 판단해서 380mm까지 자라는 혀를 사용해 먹이를 사냥해서 먹어요.',7,'https://marizoo.s3.ap-northeast-2.amazonaws.com/species/43fdef61-d9be-4bcc-ada4-bacc1c7c400eSpeciesIcon6.svg'),(7,NULL,NULL,NULL,'2023-02-16 15:13:37.957293','턱수염도마뱀','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/14645830207925.png','호주 사바나','저는 어릴 때 암수 구분이 어렵지만 어른이 되면 구분이 쉬워져요. 저희는 보통 일부다처제적 생태를 지니고 있어요. 제가 좋아하는 배스킹 스팟 온도는 35도이고 쿨존은 26-29도예요.',5,'https://marizoo.s3.ap-northeast-2.amazonaws.com/species/a6ebb62b-170a-49e8-8601-54648b7a8d0dSpeciesIcon2.svg'),(8,NULL,NULL,NULL,'2023-02-16 15:23:37.957293','거북','https://marizoo.s3.ap-northeast-2.amazonaws.com/species/tuttle.jpg','육지, 바다, 습지','저는 종에 따라 사는 곳이 다양해요. 저는 장수의 상징이지만 슬프게도 조금만 사는 친구도 존재해요.',100,'https://marizoo.s3.ap-northeast-2.amazonaws.com/species/SpeciesIconTurtle.svg');
/*!40000 ALTER TABLE `species` ENABLE KEYS */;
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
