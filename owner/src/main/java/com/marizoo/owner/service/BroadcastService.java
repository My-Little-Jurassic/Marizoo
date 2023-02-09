package com.marizoo.owner.service;

import com.marizoo.owner.api.response.CreateBroadcastResponse;
import com.marizoo.owner.entity.*;
import com.marizoo.owner.repository.*;
import com.marizoo.owner.repository.animalStore.AnimalStoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BroadcastService {
    private final BroadcastRepository broadcastRepository;
    private final AnimalStoreRepository animalStoretRepository;
    private final FeedRepository feedRepository;
    private final VoteRepository voteRepository;
    private final AnimalRepository animalRepository;

    /**
     * broadcast_id에 해당하는 방송 종료 시간
     * @param broadcastId : 방송 PK
     * @return boolean
     */
    public boolean saveEndTime(Long broadcastId){
        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);
        if(opt.isEmpty()){
            return false;
        }
        Broadcast broadcast = opt.get();
        broadcast.setEndTime();
        broadcastRepository.save(broadcast);
        return true;
    }

    /**
     * broadcast 생성
     * @param title : 방송 제목 description : 방송설명
     * @return boolean :
     */
    @Transactional
    public Long createBroadcast(
            String title, String description, String thumbnail, Long animalStoreId,
            List<Long> animalIdList
    ){
        // entity
        // animal store find
        Optional<AnimalStore> optionalAnimalStore = animalStoretRepository.findById(animalStoreId);
        if(optionalAnimalStore.isEmpty()){
            return null;
        }
        AnimalStore animalStore = optionalAnimalStore.get();

        // broadcastAnimalList 생성 : 방송 출연 동물 리스트
        List<BroadcastAnimal> broadcastAnimalList = new ArrayList<>();
        for (Long aLong : animalIdList) {
            Optional<Animal> optionalAnimal = animalRepository.findById(aLong);
            if (optionalAnimal.isEmpty()) {
                return null;
            }
            Animal animal = optionalAnimal.get();
            BroadcastAnimal broadcastAnimal = BroadcastAnimal.createBroadcastAnimal(animal, animal.getSpecies().getClassification(), animal.getSpecies().getClassificationImg());
            broadcastAnimalList.add(broadcastAnimal);
        }

        // 방송 생성
        Broadcast broadcast = Broadcast.createBroadcast(title, description, thumbnail, animalStore, broadcastAnimalList);

        // 방송 저장
        broadcastRepository.save(broadcast);
        return broadcast.getId();
    }
    public void saveSessionId(Long broadcastId, String sessionId){
        Broadcast broadcastById = broadcastRepository.findBroadcastById(broadcastId);
        broadcastById.setSessionId(sessionId);
    }
    
    public void finishBroadcast(Long broadcastId){
        Broadcast broadcastById = broadcastRepository.findBroadcastById(broadcastId);
        broadcastById.setEndTime(LocalDateTime.now());
    }
}
