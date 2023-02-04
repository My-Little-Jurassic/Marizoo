package com.marizoo.owner.repository;

import com.marizoo.owner.entity.AnimalStore;
import com.marizoo.owner.entity.Broadcast;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalStoretRepository extends JpaRepository<AnimalStore, Long> {

}
