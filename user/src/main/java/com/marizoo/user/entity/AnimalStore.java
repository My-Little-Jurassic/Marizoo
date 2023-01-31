package com.marizoo.user.entity;

<<<<<<< HEAD
import lombok.Getter;

import javax.persistence.*;
import java.sql.Time;

@Entity
@Table(name = "animal_store")
@Getter
public class AnimalStore {
    @Id @GeneratedValue
    @Column(name = "animal_store_id")
    private Long id;

    private String storeName;           // 가게 이름
    private String description;         // 가게 설명
    private String address;             // 가게 주소
    private Time openingHours;          // 가게 영업 시간
    private String tel;                 // 가게 전화번호
    private String email;               // 가게 이메일
    private String profileImg;          // 가게 사진
    private String lat;                 // 가게 위도
    private String lng;                 // 가게 경도
=======
import com.marizoo.user.entity.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class AnimalStore extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_store_id")
    private Long id;

    @OneToMany(mappedBy = "animalStore")
    private List<UsersAnimalStore> followers = new ArrayList<>();
    private String storeName;
    private String description;
    private String address;
    private String openingHours;
    private String tel;
    private String email;
    private String profileImg;
    private Float lat;
    private Float lng;

    @OneToMany(mappedBy = "animalStore")
    private List<Play> playList = new ArrayList<>();

    @OneToMany(mappedBy = "animalStore")
    private List<Animal> animalList = new ArrayList<>();

    @OneToMany(mappedBy = "animalStore")
    private List<Broadcast> broadcastList = new ArrayList<>();
>>>>>>> 043d037fef92b98b56fa9f9a2c94b43ce2a58bee
}
