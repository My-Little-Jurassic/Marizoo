package com.marizoo.user.entity;

import com.marizoo.user.entity.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class UsersPlay extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "users_play_id")
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "play_id")
    private Play play;
    private Integer totalVisitor;
    @Enumerated(EnumType.STRING)
    private BookStatus status;

//    === 생성 메서드 ===
    public static UsersPlay createUsersPlay(User user, Play play, Integer totalVisitor){
        UsersPlay usersPlay = new UsersPlay();
        usersPlay.setUser(user);
        usersPlay.setPlay(play);
        usersPlay.setTotalVisitor(totalVisitor);
        usersPlay.setStatus(BookStatus.BOOK);
        return usersPlay;
    }

}
