package com.marizoo.user.repository;

import com.marizoo.user.dto.BroadcastDto;
import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.entity.BroadcastStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BroadcastRepository extends JpaRepository<Broadcast, Long> {
    // 현재 방송 중인 목록 가져오기
    @Query("select b from Broadcast b where b.status = com.marizoo.user.entity.BroadcastStatus.ONAIR")
    List<Broadcast> findOnairs();
}
