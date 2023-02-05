package com.marizoo.owner.repository;

import com.marizoo.owner.entity.Feed;
import com.marizoo.owner.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedRepository extends JpaRepository<Feed, Long> {

}
