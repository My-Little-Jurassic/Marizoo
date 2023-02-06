package com.marizoo.user.repository.play_repo;

import com.marizoo.user.dto.play_dto.PlayInfoDto;
import com.marizoo.user.entity.Play;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PlayRepository extends JpaRepository<Play, Long> {
    
    // 가게 id로 해당 프로그램들 조회
    @Query("select p from Play p join p.animalStore a where a.id = :StoreId")
    List<Play> getPlaysAboutStoreId(@Param("StoreId") Long StoreId);
    Play findPlayById(Long play_id);
    Play save(Play play);
}
