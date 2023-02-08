package com.marizoo.owner.entity;

import com.marizoo.owner.entity.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    private String uid;
    private String pwd;
    private String phoneNumber;
    private String email;
    private String nickname;

    private String role;

    private Long watchTimeAcc;
    private Long effectClickAcc;
    private Long feedClickAcc;

    private String refreshToken;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UsersBadge> badgeList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UsersAnimalStore> followings = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<UsersPlay> bookList = new ArrayList<>();
}
