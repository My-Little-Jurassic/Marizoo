package com.marizoo.owner.repository;

import com.marizoo.owner.entity.Animal;
import com.marizoo.owner.entity.BroadcastAnimal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BroadcastAnimalRepository extends JpaRepository<BroadcastAnimal, Long> {
    List<BroadcastAnimal> findByBroadcastId(Long broadcastId);

}
