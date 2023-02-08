package com.marizoo.owner.repository.animalStore;

import com.marizoo.owner.dto.OwnedAnimalDto;

import java.util.List;

public interface AnimalStoreRepositoryCustom {
    List<OwnedAnimalDto> findOwnedAnimalInfo(Long storeId);
}
