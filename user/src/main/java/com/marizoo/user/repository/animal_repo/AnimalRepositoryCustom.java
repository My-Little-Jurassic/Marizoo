package com.marizoo.user.repository.animal_repo;

import com.marizoo.user.entity.BroadcastStatus;

public interface AnimalRepositoryCustom {

    BroadcastStatus findBroadcastStatus(Long animalId);
}
