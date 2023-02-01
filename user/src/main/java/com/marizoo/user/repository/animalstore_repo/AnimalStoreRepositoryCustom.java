package com.marizoo.user.repository.animalstore_repo;

import com.marizoo.user.entity.AnimalStore;

import java.util.List;

public interface AnimalStoreRepositoryCustom {

    // 해당 종을 보유한 가게 검색
    List<AnimalStore> searchAnimalStoreHavingSpecies(String species);

}
