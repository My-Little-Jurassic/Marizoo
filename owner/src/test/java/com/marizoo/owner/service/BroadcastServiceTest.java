package com.marizoo.owner.service;

import com.marizoo.owner.entity.AnimalStore;
import com.marizoo.owner.entity.Broadcast;
import com.marizoo.owner.entity.BroadcastAnimal;
import com.marizoo.owner.entity.FeedVote;
import com.marizoo.owner.repository.BroadcastAnimalRepository;
import com.marizoo.owner.repository.BroadcastRepository;
import com.marizoo.owner.repository.FeedVoteRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
class BroadcastServiceTest {
    @Autowired
    BroadcastService broadcastService;
    @Autowired
    BroadcastRepository broadcastRepository;
    @Autowired
    BroadcastAnimalRepository broadcastAnimalRepository;
    @Autowired
    FeedVoteRepository feedVoteRepository;


    @Test
    public void createBroadcast(){
        // Given
        String title = "우파루파먹방";
        String desc = "우파루파 먹방이에요";
        String thumbnail = "asdf.img";
        Long animalStoreId = 1L;
        List<Long> animalIdList = new ArrayList<>();
        animalIdList.add(1L);
        animalIdList.add(2L);

        int originFeedVoteSize = feedVoteRepository.findAll().size();
        Long broadcastId = broadcastService.createBroadcast(title, desc, thumbnail, animalStoreId, animalIdList);

        //Then
        // 방송 정보 확인
        Broadcast broadcast = broadcastRepository.findById(broadcastId).get();
        assertThat(broadcast.getTitle()).isEqualTo(title);
        assertThat(broadcast.getDescription()).isEqualTo(desc);
        assertThat(broadcast.getThumbnail()).isEqualTo(thumbnail);

        // 방송 출연 동물 마리수 확인
        List<BroadcastAnimal> broadcastAnimalList = broadcastAnimalRepository.findByBroadcastId(broadcastId);
        assertThat(broadcastAnimalList.size()).isEqualTo(animalIdList.size());
    }

    @Test
    public void endBroadcast(){
        // Given
        LocalDateTime endTime = LocalDateTime.now();
        String title = "우파루파먹방";
        String desc = "우파루파 먹방이에요";
        String thumbnail = "asdf.img";
        Long animalStoreId = 1L;
        List<Long> animalIdList = new ArrayList<>();
        animalIdList.add(1L);
        animalIdList.add(2L);

        Long broadcastId = broadcastService.createBroadcast(title, desc, thumbnail, animalStoreId, animalIdList);

        // When
        broadcastService.saveEndTime(broadcastId);

        // Then
        Broadcast broadcast = broadcastRepository.findById(broadcastId).get();
        System.out.println(broadcast.getEndTime());

    }

}