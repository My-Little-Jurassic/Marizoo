package com.marizoo.user.repository.animalstore_repo;

import com.marizoo.user.entity.AnimalStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface AnimalStoreRepository extends JpaRepository<AnimalStore, Long>, AnimalStoreRepositoryCustom {

    // 가게 목록 전체 조회
    List<AnimalStore> findAll();

    // 상호명으로 가게 검색
    List<AnimalStore> findBystoreNameContaining(String storeName);



}















