package com.marizoo.user.repository.animalstore_repo;

import com.marizoo.user.dto.UsersPlay_dto.UsersPlayDto;
import com.marizoo.user.dto.animal_dto.OwnedAnimalDto;
import com.marizoo.user.entity.AnimalStore;

import java.util.List;

public interface AnimalStoreRepositoryCustom {

    // 해당 종을 보유한 가게 검색
    List<AnimalStore> searchAnimalStoreHavingSpecies(String species);
    List<OwnedAnimalDto> findOwnedAnimalInfo(Long storeId);
    List<String> findClassificationImgs(Long storeId);
    UsersPlayDto findStoreNameForReservation(Long bookId);
}
