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
     */
    public void endBroadcast(Long broadcastId, Vote vote){
        // broadcastId에 해당하는 방송 가져오기
        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);
        if(opt.isEmpty()){
            throw new RuntimeException("해당하는 방송이 존재하지 않습니다.");
        }
        Broadcast broadcast = opt.get();

        // boradcast 방송 종료 로직 실행
        broadcast.endBroadcast();
        // vote 정보가 null이 아닐 경우만 vote 정보를 설정
        if(vote != null){
            broadcast.setVote(vote);
        }

        // 방송 끝난 동물 onAir -> offAir로
        for (BroadcastAnimal broadcastAnimal : broadcast.getBroadcastAnimalList()) {
            broadcastAnimal.getAnimal().setIsOnAir("offAir");
        }

        broadcastRepository.save(broadcast);
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
            throw new RuntimeException("존재하지 않는 가게입니다.");
        }
        AnimalStore animalStore = optionalAnimalStore.get();

        // broadcastAnimalList 생성 : 방송 출연 동물 리스트
        List<BroadcastAnimal> broadcastAnimalList = new ArrayList<>();
        for (Long aLong : animalIdList) {
            Optional<Animal> optionalAnimal = animalRepository.findById(aLong);
            if (optionalAnimal.isEmpty()) {
                throw new RuntimeException("존재하지 않는 동물입니다.");
            }
            Animal animal = optionalAnimal.get();

            // 방송 시작하는 동물 offAir -> onAir로
            animal.setIsOnAir("onAir");
            animalRepository.save(animal);

            BroadcastAnimal broadcastAnimal = BroadcastAnimal.createBroadcastAnimal(animal, animal.getSpecies().getClassification(), animal.getSpecies().getClassificationImg());
            broadcastAnimalList.add(broadcastAnimal);
        }

        if(img.isEmpty()) {
            throw new RuntimeException("썸네일을 설정하지 않았습니다.");
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


    @Transactional
    public void bulkAddBadge(List<Long> userIdList, Long badgeId) {
        usersBadgeRepository.bulkAddBadge(userIdList, badgeId);
    }
}
