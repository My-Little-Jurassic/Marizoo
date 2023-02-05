package com.marizoo.owner.entity;

import com.marizoo.owner.entity.common.BaseEntity;
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

    @OneToMany(mappedBy = "vote", cascade = CascadeType.ALL)
    private List<FeedVote> feedVoteList = new ArrayList<>();

//    ===연관관계 메서드 ===
    public void addFeedVote(FeedVote feedVote){
        this.feedVoteList.add(feedVote);
        feedVote.setVote(this);
    }

//    === 생성 메서드 ===
    public static Vote createVote(String title, List<FeedVote> feedVoteList){
        Vote vote = new Vote();
        vote.setTitle(title);
        for (FeedVote feedVote : feedVoteList) {
            vote.addFeedVote(feedVote);
        }
        return vote;
    }
}
