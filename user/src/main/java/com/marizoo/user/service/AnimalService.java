package com.marizoo.user.service;

import com.marizoo.user.entity.Animal;
import com.marizoo.user.repository.animal_repo.AnimalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

    public List<Animal> findOwnedAnimal(Long storeId){
        return animalRepository.findAnimalByAnimalStoreId(storeId);
    }

}
