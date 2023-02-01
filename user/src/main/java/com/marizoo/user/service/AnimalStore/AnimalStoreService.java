package com.marizoo.user.service.AnimalStore;

import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.repository.AnimalStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnimalStoreService {

    private final AnimalStoreRepository animalStoreRepository;

    public List<AnimalStore> findAnimalStores(){
        return animalStoreRepository.findAll();
    }



}
