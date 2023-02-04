package com.marizoo.owner.repository;

import com.marizoo.owner.entity.Broadcast;
import com.marizoo.owner.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoteRepository extends JpaRepository<Vote, Long> {

}
