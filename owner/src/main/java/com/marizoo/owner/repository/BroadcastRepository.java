package com.marizoo.owner.repository;

import com.marizoo.owner.entity.Broadcast;
import com.marizoo.owner.entity.BroadcastStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {
    Broadcast findBroadcastById(Long id);

    List<Broadcast> findByStatus(BroadcastStatus status);
}
