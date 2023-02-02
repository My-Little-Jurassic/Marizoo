package com.marizoo.user.entity;

import com.marizoo.user.entity.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Broadcast extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "broadcast_id")
    private Long id;
    private String title;
    private String description;
    private String thumbnail;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    @Enumerated(EnumType.STRING)
    private BroadcastStatus status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_store_id")
    private AnimalStore animalStore;

    @OneToMany(mappedBy = "broadcast")
    private List<BroadcastAnimal> broadcastAnimalList = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote vote;
}
