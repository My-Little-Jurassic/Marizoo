package com.marizoo.owner.entity;

import com.marizoo.owner.entity.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Species extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "species_id")
    private Long id;

    private String classification;
    private String classificationImg;

    private String habitat;

    private Integer lifeSpan;

    private String info;

    @OneToMany(mappedBy = "species")
    private List<Animal> animalList = new ArrayList<>();

    @OneToMany(mappedBy = "species")
    private List<SpeciesFeed> speciesFeedList = new ArrayList<>();

//    === 연관관계 메서드 ===

    public void addAnimal(Animal animal){
        this.animalList.add(animal);
        animal.setSpecies(this);
    }

    public void addSpeciesFeed(SpeciesFeed speciesFeed){
        this.speciesFeedList.add(speciesFeed);
        speciesFeed.setSpecies(this);
    }
}
