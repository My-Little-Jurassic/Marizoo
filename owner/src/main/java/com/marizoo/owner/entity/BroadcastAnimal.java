package com.marizoo.owner.entity;

import com.marizoo.owner.entity.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class BroadcastAnimal extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "broadcast_animal_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "broadcast_id")
    private Broadcast broadcast;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "animal_id")
    private Animal animal;

    private String classification;
    private String classificationImg;

//    === 생성 메서드 ===
    public static BroadcastAnimal createBroadcastAnimal(Animal animal, String classification, String classificationImg){
        BroadcastAnimal broadcastAnimal = new BroadcastAnimal();
        broadcastAnimal.setAnimal(animal);
        broadcastAnimal.setClassification(classification);
        broadcastAnimal.setClassificationImg(classificationImg);
        return broadcastAnimal;
    }
}
