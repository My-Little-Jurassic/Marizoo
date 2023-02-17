package com.marizoo.owner.repository;

import com.marizoo.owner.entity.Animal;
import com.marizoo.owner.entity.AnimalStore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

}
