package com.marizoo.owner.entity;

import com.marizoo.owner.entity.common.BaseEntity;
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

//    === 연관관계 메소드 ===

    public void setAnimalStore(AnimalStore animalStore){
        if(this.animalStore != null){
            this.animalStore.getBroadcastList().remove(this);
        }
        this.animalStore = animalStore;
        animalStore.getBroadcastList().add(this);
    }

    public void addBroadcastAnimal(BroadcastAnimal broadcastAnimal){
        broadcastAnimalList.add(broadcastAnimal);
        broadcastAnimal.setBroadcast(this);
    }

    public void setVote(Vote vote){
        this.vote = vote;
    }

    public void setEndTime(){
        this.endTime = LocalDateTime.now();
    }

//    === 생성 메서드 ===

    // 방송 시작
    public static Broadcast createBroadcast(
            String title, String description, String thumbnail, AnimalStore animalStore, List<BroadcastAnimal> broadcastAnimalList, Vote vote){
        Broadcast broadcast = new Broadcast();
        broadcast.setTitle(title);
        broadcast.setDescription(description);
        broadcast.setThumbnail(thumbnail);
        broadcast.setStartTime(LocalDateTime.now());
        broadcast.setStatus(BroadcastStatus.ONAIR);
        broadcast.setAnimalStore(animalStore);
        for (BroadcastAnimal broadcastAnimal : broadcastAnimalList) {
            broadcast.addBroadcastAnimal(broadcastAnimal);
        }
        broadcast.setVote(vote);
        return broadcast;
    }

    //    === 비즈니스 로직 ===
    // 방송 종료
    public void endBroadcast(){
        if(this.getStatus() == BroadcastStatus.FINISH){
            // 이미 종료된 방송은 종료 불가
        }
        this.setStatus(BroadcastStatus.FINISH);
        this.setEndTime();
    }

}
