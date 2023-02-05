package com.marizoo.owner.repository.animalStore;

import com.marizoo.owner.entity.AnimalStore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalStoreRepository extends JpaRepository<AnimalStore, Long>, AnimalStoreRepositoryCustom {

}
