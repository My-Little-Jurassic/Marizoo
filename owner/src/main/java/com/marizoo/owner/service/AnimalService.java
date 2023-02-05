package com.marizoo.owner.service;

import com.marizoo.owner.dto.OwnedAnimalDto;
import com.marizoo.owner.repository.AnimalRepository;
import com.marizoo.owner.repository.animalStore.AnimalStoreRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalStoreRepositoryCustom animalStoreRepository;

    public List<OwnedAnimalDto> findOwnedAnimal(Long storeId){
        return animalStoreRepository.findOwnedAnimalInfo(storeId);
    }
}
