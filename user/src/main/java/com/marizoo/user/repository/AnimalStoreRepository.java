package com.marizoo.user.repository;

import com.marizoo.user.entity.AnimalStore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalStoreRepository extends JpaRepository<AnimalStore, Long> {

    List<AnimalStore> findAll();
}
