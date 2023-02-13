package com.marizoo.owner.repository;

import com.marizoo.owner.entity.Feed;
import com.marizoo.owner.entity.FeedVote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedVoteRepository extends JpaRepository<FeedVote, Long> {
}
