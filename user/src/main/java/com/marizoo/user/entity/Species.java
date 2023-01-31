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
public class Species extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "species_id")
    private Long id;

    private String classification;

    private String habitat;

    private Integer lifeSpan;

    private String info;

    @OneToMany(mappedBy = "species")
    private List<Animal> animalList = new ArrayList<>();

    @OneToMany(mappedBy = "species")
    private List<SpeciesFeed> speciesFeedList = new ArrayList<>();
}
