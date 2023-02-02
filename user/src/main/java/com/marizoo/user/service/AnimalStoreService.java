package com.marizoo.user.service;

import com.marizoo.user.dto.animalstore_dto.FollowDto;
import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.entity.Play;
import com.marizoo.user.entity.User;
import com.marizoo.user.entity.UsersAnimalStore;
import com.marizoo.user.repository.UserRepository;
import com.marizoo.user.repository.animalstore_repo.AnimalStoreFollowRepository;
import com.marizoo.user.repository.animalstore_repo.AnimalStoreRepository;
import com.marizoo.user.repository.play_repo.PlayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnimalStoreService {

    private final UserRepository userRepository;
    private final AnimalStoreRepository animalStoreRepository;
    private final AnimalStoreFollowRepository animalStoreFollowRepository;
    private final PlayRepository playRepository;

    /**
     * 가게 목록 전체 조회
     * @return 전제 가게 목록
     */

    public List<AnimalStore> findAnimalStores(){
        return animalStoreRepository.findAll();
    }

    /**
     * 가게고유아이디로 가게 조회
     * @param storeId : 가게 고유 id
     * @return : 가게
     */

    public AnimalStore findAnimalStore(Long storeId) {
        return animalStoreRepository.findAnimalStoreById(storeId).get();
    }

    /**
     * 검색한 상호명이 포함된 가게 조회.
     * @param storename : 상호명
     * @return 가게
     */
    public List<AnimalStore> findAnimalStoresbyNameSearch(String storename){
        return animalStoreRepository.findBystoreNameContaining(storename);
    }

    /**
     * 검색한 종을 포함한 가게 조회.
     * @param species : 종
     * @return 가게
     */
    
    public List<AnimalStore> findAnimalStoresbySpeciesSearch(String species){
        return animalStoreRepository.searchAnimalStoreHavingSpecies(species);
    }


     public void followingStore(Long storeId, Long userId){
//        User user = userRepository.findByUid(userId);
        AnimalStore animalStore = animalStoreRepository.findAnimalStoreById(storeId).get();
        UsersAnimalStore follower = new UsersAnimalStore();
        animalStoreFollowRepository.save(follower);
     }

    /**
     * 가게 id에 해당하는 체험 프로그램 조회.
     * @param storeId : 가게 id
     * @return  체험 프로그램 목록
     */
     public List<Play> findPlayByStore(Long storeId){
        return playRepository.findPlaysByStoreId(storeId);
     }




}
