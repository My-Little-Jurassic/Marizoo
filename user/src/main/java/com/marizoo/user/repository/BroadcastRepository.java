package com.marizoo.user.repository;

import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.entity.BroadcastStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {
    // 현재 방송 중인 목록 가져오기
    List<Broadcast> findByStatus(BroadcastStatus status);
}
