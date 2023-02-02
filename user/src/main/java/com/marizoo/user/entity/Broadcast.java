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

<<<<<<< HEAD
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote vote;

=======
    /*
        23.01.31
        [방송 - 투표]의 관계는 일대일 단방향 매핑으로 구현하는게 맞다 생각하여, 방송쪽의 외래키를 주석처리함.
     */
//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "vote_id")
//    private Vote vote;
>>>>>>> b62b6b096a6848912281dfcad7f06d86d59b32b8
}
