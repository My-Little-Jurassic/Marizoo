# Porting

# 개발 환경

### 형상 관리

- Gitlab

### OS

- Window 10

### UI/UX

- Figma

### Communication

- Mattermost
- Notion

### 이슈 관리

- Jira

### IDE

- IntelliJ IDEA 2020.3
- Visual Studio Code 1.75.1

### Server

- AWS EC2
    - Docker `version "20.10.23 LTS"`
    - Ubuntu `version "20.04 LTS"`
    - Ubuntu `version "20.04 LTS"` (개인)

### 기타 편의 툴

- Postman
- Termius

[EC2 Ubuntu](Porting%20cff288dff52145cf88430cb9f53eb307/EC2%20Ubuntu%206faecd6325d44f6cb699f14490d03a76.md)

### Front-end

- Node js `version "18.13.0"`
- TypeScript `version "4.9.4"`
- React `version "18.2.0"`
- Redux-Toolkit `version "1.9.1"`
- Styled Components `version "5.3.6"`
- axios `version "^1.2.3"`
- react-router-dom `version "^6.7.0"`
- Openvidu `version "2.25.0"`

### Database

- MySQL 8.0.32-0ubuntu0.20.04.2

### Back-end

- Java openjdk `version "11.0.15" 2022-04-19 LTS`
- Spring Boot `version "2.7.8"`
    - Spring Data JPA
    - Lombok
    - Spring Security
    - Spring Cloud Discovery
    - Spring Cloud Config
    - Validation
    - Spring Web
- gradle `version "7.6"`
- QueryDsl  `version "1.0.10"`
- Swagger `version "2.9.2"`
- p6spy `version "1.8.1"`
- com.auth0:java-jwt `version "3.10.2"`
- Openvidu `version "2.25.0"`

### **외부 서비스**

- AWS S3
    - [https://aws.amazon.com/ko/s3/?did=ap_card&trk=ap_card](https://aws.amazon.com/ko/s3/?did=ap_card&trk=ap_card)
- Kakao Map API
    - [https://apis.map.kakao.com/web/](https://apis.map.kakao.com/web/)

## 시연 시나리오

1. 메인 페이지
    - 파충류명을 통해 현재 진행중인 방송을 검색한다.
    
    ![main-search-0.gif](Porting%20cff288dff52145cf88430cb9f53eb307/main-search-0.gif)
    
    - 파충류 아이콘을 통해 현재 진행중인 방송을 검색한다.
    
    ![main-filter-0.gif](Porting%20cff288dff52145cf88430cb9f53eb307/main-filter-0.gif)
    
2. 방송 페이지
    
    ![broadcast-0.gif](Porting%20cff288dff52145cf88430cb9f53eb307/broadcast-0.gif)
    
    1. 리액션 버튼
        
        ![broadcast-reaction-0.gif](Porting%20cff288dff52145cf88430cb9f53eb307/broadcast-reaction-0.gif)
        
    2. 먹이주기 투표
        
        ![broadcast-vote-0.gif](Porting%20cff288dff52145cf88430cb9f53eb307/broadcast-vote-0.gif)
        
    3. 부화 뱃지 수령
        
        ![broadcast-badge-0.gif](Porting%20cff288dff52145cf88430cb9f53eb307/broadcast-badge-0.gif)
        
3. 마이페이지
    - 비밀번호 확인 후 회원 정보를 수정할 수있다.
    - 획득한 배지 목록을 볼 수 있다.
    - 팔로우 중인 가게 목록을 볼 수 있다.
    - 예약 목록을 확인하고 취소할 수 있다.
    
    ![shop_mypage_0.gif](Porting%20cff288dff52145cf88430cb9f53eb307/shop_mypage_0.gif)
    

## 파충류샵 연결 네트워크

1. 카페 탐방 페이지
    - 카페명을 통해 검색한다.
    
    ![shop-search-0.gif](Porting%20cff288dff52145cf88430cb9f53eb307/shop-search-0.gif)
    
    - 다크모드
    
    ![shop-search-1.gif](Porting%20cff288dff52145cf88430cb9f53eb307/shop-search-1.gif)
    
    - 파충류 아이콘을 통해 해당 파충류가 있는 카페를 검색한다.
        
        ![shop-filter-1.gif](Porting%20cff288dff52145cf88430cb9f53eb307/shop-filter-1.gif)
        
2. 카페 상세 페이지
    - 카페를 팔로우한다.
    - 카페가 보유한 파충류 목록을 볼 수 있다.
    - 카페가 현재 진행 중인 방송 목록을 볼 수 있다.
        
        ![shop-detail-follow-1.gif](Porting%20cff288dff52145cf88430cb9f53eb307/shop-detail-follow-1.gif)
        
    
    - 카페에서 올려놓은 체험 프로그램을 예약한다.
        
        ![shop-reservation-1.gif](Porting%20cff288dff52145cf88430cb9f53eb307/shop-reservation-1.gif)
        

## 파충류 지식 습득

1. 도감 페이지
    - 파충류 종 카테고리를 클릭한다.
    - 클릭한 종에 해당하는 정보를 볼 수 있다. 또한 등록된 카페가 보유한 종 파충류 목록을 보여준다.
        
        ![pedia-1.gif](Porting%20cff288dff52145cf88430cb9f53eb307/pedia-1.gif)
        
    - 목록 중 하나를 클릭하면 해당 파충류의 상세 정보 페이지로 넘어간다.
        
        ![animal-detail-1.gif](Porting%20cff288dff52145cf88430cb9f53eb307/animal-detail-1.gif)