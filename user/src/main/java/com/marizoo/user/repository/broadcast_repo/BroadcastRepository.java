package com.marizoo.user.repository.broadcast_repo;

import com.marizoo.user.dto.broadcast_dto.BroadcastDto;
import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.entity.BroadcastStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BroadcastRepository extends JpaRepository<Broadcast, Long>, BroadcastRepositoryCustom {
    // 현재 방송 중인 목록 가져오기)
    Page<Broadcast> findByStatus(BroadcastStatus status, Pageable pageable);

    @Query("select b from Broadcast b where b.animalStore.id = :storeId " +
            "and b.status = com.marizoo.user.entity.BroadcastStatus.ONAIR")
    List<Broadcast> findBroadcasts(@Param("storeId")Long storeId);
}
