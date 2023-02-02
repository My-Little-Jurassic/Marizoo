package com.marizoo.user.service;

import com.marizoo.user.dto.animal_dto.OwnedAnimalDto;
import com.marizoo.user.entity.Animal;
import com.marizoo.user.repository.animal_repo.AnimalRepository;
import com.marizoo.user.repository.animalstore_repo.AnimalStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

    private final AnimalStoreRepository animalStoreRepository;

    public List<OwnedAnimalDto> findOwnedAnimal(Long storeId){
        return animalStoreRepository.findOwnedAnimalInfo(storeId);
    }

}
