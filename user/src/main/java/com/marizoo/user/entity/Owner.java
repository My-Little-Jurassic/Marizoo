package com.marizoo.user.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Owner {

    @Id @GeneratedValue
    @Column(name = "owner_id")
    private Long id;

    private String oid;
    private String pwd;

    @OneToOne
    @JoinColumn(name = "animal_store_idsa")
    private AnimalStore animalStore;

}
