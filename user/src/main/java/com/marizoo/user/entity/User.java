package com.marizoo.user.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

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
}
