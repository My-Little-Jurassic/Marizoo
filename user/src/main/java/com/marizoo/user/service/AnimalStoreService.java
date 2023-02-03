package com.marizoo.user.service;

import com.marizoo.user.api.animalstore_api.PlayAndStoreInfoResponse;
import com.marizoo.user.dto.animalstore_dto.FollowDto;
import com.marizoo.user.dto.animalstore_dto.StoreInfoDto;
import com.marizoo.user.dto.animalstore_dto.StoreSubDto;
import com.marizoo.user.dto.broadcast_dto.BroadcastDto;
import com.marizoo.user.dto.broadcast_dto.BroadcastsDto;
import com.marizoo.user.dto.play_dto.PlayInfoDto;
import com.marizoo.user.dto.play_dto.StorePlayDto;
import com.marizoo.user.entity.*;
import com.marizoo.user.repository.UserRepository;
import com.marizoo.user.repository.animalstore_repo.AnimalStoreFollowRepository;
import com.marizoo.user.repository.animalstore_repo.AnimalStoreRepository;
import com.marizoo.user.repository.broadcast_repo.BroadcastRepository;
import com.marizoo.user.repository.play_repo.PlayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import springfox.documentation.service.ResponseMessage;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnimalStoreService {

    private final UserRepository userRepository;
    private final AnimalStoreRepository animalStoreRepository;
    private final AnimalStoreFollowRepository animalStoreFollowRepository;
    private final PlayRepository playRepository;
    private final BroadcastRepository broadcastRepository;

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

    // 팔로우
     public void followingStore(Long storeId, Long userId){
        User user = userRepository.findById(userId).get();
        AnimalStore animalStore = animalStoreRepository.findAnimalStoreById(storeId).get();
        UsersAnimalStore follower = new UsersAnimalStore(animalStore, user);
        animalStoreFollowRepository.save(follower);
     }

    /**
     * 가게 id에 해당하는 체험 프로그램 조회.
     * @param storeId : 가게 id
     * @return  체험 프로그램 목록
     */
     public List<Play> findPlayByStore(Long storeId){
        return playRepository.getPlaysAboutStoreId(storeId);
     }

//     public List<BroadcastsDto> findBroadcastsDto(Long storeId){
//         // 해당 가게의 현재 스트리밍 중인 방송들
//         List<Broadcast> broadcastList = broadcastRepository.findBroadcasts(storeId);
//         // 위 방송에 포함되는 동물의 종이미지 리스트 조회.
//         for(Boardcast b)
//
//         return null;
//     }

    public PlayAndStoreInfoResponse findPlayInfo(Long store_id, Long play_id){
         Play play = playRepository.findPlayById(play_id);
         // 보내는 날짜와 시간은 아직 형식을 정하지 않아서 , localDateTime으로 보냄.
         PlayInfoDto playInfoDto = new PlayInfoDto(play.getPlayDateTime(),
                                                play.getTitle(),
                                                play.getDescription(),
                                                play.getRunningTime(),
                                                play.getNotice());
         AnimalStore animalStore = animalStoreRepository.findAnimalStoreById(store_id).get();
         StoreInfoDto storeInfoDto= new StoreInfoDto(animalStore.getStoreName(),
                                                 animalStore.getAddress(),
                                                 animalStore.getTel());
         return new PlayAndStoreInfoResponse(playInfoDto, storeInfoDto);
     }

    public StoreSubDto findStoreSubDto(Long animalId){
         AnimalStore animalStore = animalStoreRepository.findAnimalStoreSubInfo(animalId);
         return new StoreSubDto(animalStore.getId(), animalStore.getStoreName(), animalStore.getProfileImg());
    }


}