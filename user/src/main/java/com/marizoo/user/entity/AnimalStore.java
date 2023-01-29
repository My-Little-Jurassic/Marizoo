package com.marizoo.user.entity;

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
}
