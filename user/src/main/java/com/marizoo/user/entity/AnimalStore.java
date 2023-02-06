package com.marizoo.user.entity;

import com.marizoo.user.entity.common.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

}
