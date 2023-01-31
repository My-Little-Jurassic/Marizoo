package com.marizoo.user.entity;

import com.marizoo.user.entity.common.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Vote extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_id")
    private Long id;

    private String title;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boardcast_id")
    private Broadcast broadcast;

    @OneToMany(mappedBy = "vote")
    private List<FeedVote> feedVoteList = new ArrayList<>();
}
