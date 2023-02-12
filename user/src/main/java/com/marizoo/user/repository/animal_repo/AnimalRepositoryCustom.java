package com.marizoo.user.repository.animal_repo;

import com.marizoo.user.dto.animal_dto.AnimalDetailDto;
import com.marizoo.user.dto.broadcast_dto.BroadcastStatusDto;
import com.marizoo.user.entity.Animal;
import com.marizoo.user.entity.BroadcastStatus;

public interface AnimalRepositoryCustom {

    BroadcastStatusDto findBroadcastStatus(Long animalId);
    AnimalDetailDto findAnimalDetail(Long animalId);
}
