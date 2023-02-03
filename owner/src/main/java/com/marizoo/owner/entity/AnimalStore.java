package com.marizoo.owner.entity;

import com.marizoo.owner.entity.common.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

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
    private List<UsersAnimalStore> followers = new ArrayList<>();

    @OneToMany(mappedBy = "animalStore")
    private List<Play> playList = new ArrayList<>();

    @OneToMany(mappedBy = "animalStore")
    private List<Animal> animalList = new ArrayList<>();

    @OneToMany(mappedBy = "animalStore")
    private List<Broadcast> broadcastList = new ArrayList<>();

//    === 연관관계 메서드 ===

    public void addFollower(UsersAnimalStore usersAnimalStore) {
        this.followers.add(usersAnimalStore);
        usersAnimalStore.setAnimalStore(this);
    }

    public void addPlay(Play play) {
        this.playList.add(play);
        play.setAnimalStore(this);
    }

    public void addAnimal(Animal animal) {
        this.animalList.add(animal);
        animal.setAnimalStore(this);
    }

    public void addBroadcast(Broadcast broadcast){
        this.broadcastList.add(broadcast);
        broadcast.setAnimalStore(this );
    }


}
