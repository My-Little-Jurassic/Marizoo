package com.marizoo.user.repository.animal_repo;

import com.marizoo.user.entity.Animal;
import com.marizoo.user.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AnimalRepository extends JpaRepository<Animal, Long>, AnimalRepositoryCustom {

    Animal findAnimalById(Long animalId);

    // 해당 종인 동물 목록
    List<Animal> findBySpeciesId(Long speciesId);
}
