package com.marizoo.user.repository.animal_repo;

import com.marizoo.user.entity.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long> {

    @Query("select a from Animal a join AnimalStore b where b.id = :storeId")
    List<Animal> findAnimalByAnimalStoreId(@Param("storeId")Long storeId);

}
