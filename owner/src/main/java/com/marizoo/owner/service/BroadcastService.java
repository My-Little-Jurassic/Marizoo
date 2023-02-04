package com.marizoo.owner.service;

import com.marizoo.owner.entity.*;
import com.marizoo.owner.repository.AnimalRepository;
import com.marizoo.owner.repository.AnimalStoretRepository;
import com.marizoo.owner.repository.BroadcastRepository;
import com.marizoo.owner.repository.VoteRepository;
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
    private final AnimalStoretRepository animalStoretRepository;
    private final VoteRepository voteRepository;
    private final AnimalRepository animalRepository;

    /**
     * broadcast_id에 해당하는 방송 종료 시간
     * @param broadcastId : 방송 PK
     * @param endTime : 방송 종료 시간
     * @return boolean
     */
    public boolean saveEndTime(Long broadcastId, LocalDateTime endTime){
        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);
        if(opt.isEmpty()){
            return false;
        }
        Broadcast broadcast = opt.get();
        broadcast.setEndTime(endTime);
        broadcastRepository.save(broadcast);
        return true;
    }

    /**
     * broadcast 생성
     * @param title : 방송 제목 description : 방송설명
     * @return boolean :
     */
    @Transactional
    public boolean createBroadcast(
            String title, String description, String thumbnail, Long animalStoreId,
            List<Long> animalIdList, Long voteId
    ){
        // entity
        Optional<AnimalStore> optionalAnimalStore = animalStoretRepository.findById(animalStoreId);
        if(optionalAnimalStore.isEmpty()){
            return false;
        }
        AnimalStore animalStore = optionalAnimalStore.get();

        Optional<Vote> optionalVote = voteRepository.findById(voteId);
        if (optionalVote.isEmpty()) {
            return false;
        }
        Vote vote = optionalVote.get();

        List<BroadcastAnimal> broadcastAnimalList = new ArrayList<>();
        for (Long aLong : animalIdList) {
            Optional<Animal> optionalAnimal = animalRepository.findById(aLong);
            if (optionalAnimal.isEmpty()) {
                return false;
            }
            Animal animal = optionalAnimal.get();
            BroadcastAnimal broadcastAnimal = BroadcastAnimal.createBroadcastAnimal(animal, animal.getSpecies().getClassification(), animal.getSpecies().getClassificationImg());
            broadcastAnimalList.add(broadcastAnimal);
        }

        // 방송 생성
        Broadcast broadcast = Broadcast.createBroadcast(title, description, thumbnail, animalStore, broadcastAnimalList, vote);

        // 방송 저장
        broadcastRepository.save(broadcast);
        return true;
    }
}
