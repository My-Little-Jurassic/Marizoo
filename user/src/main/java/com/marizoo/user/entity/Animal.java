package com.marizoo.user.entity;

import com.marizoo.user.entity.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Animal extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_id")
    private Long id;

    private String name;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String feature;
    private String img;

    private Integer length;
    private Integer weight;
    private Integer age;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_store_id")
    private AnimalStore animalStore;

    @OneToMany(mappedBy = "animal")
    private List<BroadcastAnimal> broadcastAnimalList = new ArrayList<>();

    @OneToMany(mappedBy = "animal")
    private List<AnimalFeed> animalFeedList = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "species_id")
    private Species species;


}
