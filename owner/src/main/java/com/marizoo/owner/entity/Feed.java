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
public class Feed extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feed_id")
    private Long id;

    private String name;

    private String img;

    @OneToMany(mappedBy = "feed")
    private List<AnimalFeed> animalFeeds = new ArrayList<>();

    @OneToMany(mappedBy = "species")
    private List<SpeciesFeed> speciesFeeds = new ArrayList<>();

}
