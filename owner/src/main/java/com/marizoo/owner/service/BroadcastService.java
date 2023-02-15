package com.marizoo.owner.service;

import com.marizoo.owner.entity.*;
import com.marizoo.owner.repository.*;
import com.marizoo.owner.repository.animalStore.AnimalStoreRepository;
import com.marizoo.owner.util.AwsS3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.io.IOException;

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
    private final UsersBadgeRepository usersBadgeRepository;

    @Autowired
    private AwsS3Uploader s3Uploader;

    private static String dirName = "broadcast";

    /**
     * broadcast_id에 해당하는 방송 종료 시간
     * @param broadcastId : 방송 PK
     * @return boolean
     */
    public boolean saveEndTime(Long broadcastId, Vote vote){
        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);
        if(opt.isEmpty()){
            return false;
        }
        Broadcast broadcast = opt.get();
        broadcast.setEndTime();
        if(vote != null){
            broadcast.setVote(vote);
        }

        // 방송 끝난 동물 onAir -> offAir로
        for (BroadcastAnimal broadcastAnimal : broadcast.getBroadcastAnimalList()) {
            broadcastAnimal.getAnimal().setIsOnAir("offAir");
        }

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
            String title, String description, String sessionId, Long animalStoreId,
            List<Long> animalIdList, MultipartFile img
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

            animal.setIsOnAir("onAir");
            animalRepository.save(animal);

            BroadcastAnimal broadcastAnimal = BroadcastAnimal.createBroadcastAnimal(animal, animal.getSpecies().getClassification(), animal.getSpecies().getClassificationImg());
            broadcastAnimalList.add(broadcastAnimal);
        }

        if(img.isEmpty()) {
            return null;
        }
        String imgUrl = null;
        try {
            imgUrl = s3Uploader.upload(img, dirName);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        // 방송 생성
        Broadcast broadcast = Broadcast.createBroadcast(title, description, imgUrl, sessionId, animalStore, broadcastAnimalList);

        // 방송 저장
        broadcastRepository.save(broadcast);
        return broadcast.getId();
    }

    public void finishBroadcast(Long broadcastId){
        Broadcast broadcastById = broadcastRepository.findBroadcastById(broadcastId);
        broadcastById.setEndTime(LocalDateTime.now());
    }

    @Transactional
    public void bulkAddBadge(List<Long> userIdList, Long badgeId) {
        usersBadgeRepository.bulkAddBadge(userIdList, badgeId);
    }
}
