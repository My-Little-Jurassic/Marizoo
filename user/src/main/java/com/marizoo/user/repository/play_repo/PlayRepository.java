package com.marizoo.user.repository.play_repo;

import com.marizoo.user.entity.Play;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlayRepository extends JpaRepository<Play, Long> {
    
    // 가게 id로 해당 프로그램들 조회
    @Query("select p from Play p join AnimalStore a where a.id = :StoreId")
    List<Play> findPlaysByStoreId(@Param("StoreId") Long StoreId);


}
