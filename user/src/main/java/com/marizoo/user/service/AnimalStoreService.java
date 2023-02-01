package com.marizoo.user.service;

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

    /**
     * 가게 목록 전체 조회
     * @return 전제 가게 목록
     */

    public List<AnimalStore> findAnimalStores(){
        return animalStoreRepository.findAll();
    }

    /**
     * 검색한 상호명이 포함된 가게 조회.
     * @param storename : 상호명
     * @return 파충류 샵
     */
    public List<AnimalStore> findAnimalStoresbyNameSearch(String storename){
        return animalStoreRepository.findBystoreNameContaining(storename);
    }

    /**
     * 검색한 종을 포함한 가게 조회.
     * @param species : 종
     * @return 파충류 샵
     */
    
    public List<AnimalStore> findAnimalStoresbySpeciesSearch(String species){
        return animalStoreRepository.searchAnimalStoreHavingSpecies(species);
    }

}
