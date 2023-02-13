package com.marizoo.user.service;

import com.marizoo.user.api.animalstore_api.PlayAndStoreInfoResponse;
import com.marizoo.user.dto.animalstore_dto.*;
import com.marizoo.user.dto.play_dto.PlayInfoDto;
import com.marizoo.user.entity.*;
import com.marizoo.user.repository.UserRepository;
import com.marizoo.user.repository.animalstore_repo.AnimalStoreFollowRepository;
import com.marizoo.user.repository.animalstore_repo.AnimalStoreRepository;
import com.marizoo.user.repository.broadcast_repo.BroadcastRepository;
import com.marizoo.user.repository.play_repo.PlayRepository;
import com.marizoo.user.repository.reservation_repo.UsersPlayRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AnimalStoreService {

    private final UserRepository userRepository;
    private final AnimalStoreRepository animalStoreRepository;
    private final AnimalStoreFollowRepository animalStoreFollowRepository;
    private final PlayRepository playRepository;
    private final UsersPlayRepository usersPlayRepository;
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

    public AnimalStoreWholeDto findAnimalStore(Long storeId, Long userId) {
        log.info("가게 아이디로 가게 조회, 가게 아이디 = {} 유저 아이디 = {}", storeId, userId);
        AnimalStore animalStore = animalStoreRepository.findById(storeId).get();

        boolean followFlag = false;
        List<UsersAnimalStore> followers = animalStore.getFollowers();
        for (UsersAnimalStore usersAnimalStore : followers) {
            if (usersAnimalStore.getUser().getId() == userId) {
                followFlag = true;
                break;
            }
        }

        return new AnimalStoreWholeDto(
                animalStore.getId(),
                animalStore.getStoreName(),
                animalStore.getDescription(),
                animalStore.getAddress(),
                animalStore.getOpeningHours(),
                animalStore.getTel(),
                animalStore.getEmail(),
                animalStore.getProfileImg(),
                animalStore.getLat(),
                animalStore.getLng(),
                followFlag);
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
        AnimalStore animalStore = animalStoreRepository.findById(storeId).get();
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

    public PlayAndStoreInfoResponse findPlayInfo(Long store_id, Long play_id){
         Play play = playRepository.findPlayById(play_id);
         Integer playMaxVisitor = play.getMaxVisitor();
         Integer playTotalVisitor = usersPlayRepository.findPlayTotalVisitor(play_id).orElseGet(
                 () -> 0
         );

         // 보내는 날짜와 시간은 아직 형식을 정하지 않아서 , localDateTime으로 보냄.
         PlayInfoDto playInfoDto = new PlayInfoDto(play.getPlayDateTime(),
                                                play.getTitle(),
                                                play.getDescription(),
                                                play.getRunningTime(),
                                                play.getNotice(), 0);

         if(playMaxVisitor <= playTotalVisitor){
             return new PlayAndStoreInfoResponse(playInfoDto, null);
         }

         playInfoDto.setAvailableVisitor(playMaxVisitor - playTotalVisitor);

         AnimalStore animalStore = animalStoreRepository.findById(store_id).get();
         StoreInfoDto storeInfoDto= new StoreInfoDto(animalStore.getStoreName(),
                                                 animalStore.getAddress(),
                                                 animalStore.getTel());
         return new PlayAndStoreInfoResponse(playInfoDto, storeInfoDto);
     }




}
