package com.marizoo.user.controller;

import com.marizoo.user.api.BroadcastApi;
import com.marizoo.user.api.FeedVoteApi;
import com.marizoo.user.dto.*;
import com.marizoo.user.entity.*;
import com.marizoo.user.repository.BroadcastRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class BroadcastController {
    private final BroadcastRepository broadcastRepository;

    @GetMapping("/broadcasts")
    public ResponseEntity<?> getOnairs(){
        // 현재 방송 중인 목록 가져오기
        List<Broadcast> onairs = broadcastRepository.findByStatus(BroadcastStatus.ONAIR);
        List<BroadcastsDto> result = new ArrayList<>();
        for (Broadcast onair : onairs) {
            List<String> classifications = new ArrayList<>();
            for (BroadcastAnimal broadcastAnimal : onair.getBroadcastAnimalList()) {
                classifications.add(broadcastAnimal.getAnimal().getSpecies().getClassification());
            }
            result.add(new BroadcastsDto(onair.getTitle(), onair.getThumbnail(), classifications));
        }
        return new ResponseEntity<List<BroadcastsDto>>(result, HttpStatus.OK);
    }

    @GetMapping("/broadcasts/{broadcast_id}")
    public ResponseEntity<?> getBroadcastInfo(@PathVariable("broadcast_id") Long broadcastId){
        // broadcast_id에 해당하는 방송 정보 가져오기.

        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);
        if(opt.isEmpty()){
            // broadcast_id에 해당하는 방송이 없음
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Broadcast broadcast = opt.get();

        // 방송 정보  |  dto 형식으로 변환
        BroadcastDto broadcastDto = new BroadcastDto(broadcast.getTitle(), broadcast.getDescription());

        // 방송 출연 동물 정보  |  dto 형식으로 변환
        List<BroadcastAnimal> broadcastAnimalList = broadcast.getBroadcastAnimalList();
        List<onAirAnimalDto> animals = new ArrayList<>();
        for (BroadcastAnimal broadcastAnimal : broadcastAnimalList) {
            Animal animal = broadcastAnimal.getAnimal();
            animals.add(new onAirAnimalDto(animal.getName(), animal.getGender(), animal.getSpecies().getClassification()));
        }

        // 방송 주체 = 가게  |  dto 형식으로 변환
        AnimalStore animalStore = broadcast.getAnimalStore();
        onAirAnimalStoreDto animalStoreDto = new onAirAnimalStoreDto(animalStore.getStoreName(), animalStore.getProfileImg());

//        api 형식으로 변환
        return new ResponseEntity<BroadcastApi>(new BroadcastApi(broadcastDto, animals, animalStoreDto), HttpStatus.OK);
    }

    @GetMapping("/broadcasts/{broadcast_id}/vote")
    public ResponseEntity<?> getBroadcastVote(@PathVariable("broadcast_id") Long broadcastId){
//        broadcast_id에 해당하는 투표 옵션 가져오기
        Optional<Broadcast> opt = broadcastRepository.findById(broadcastId);

        if(opt.isEmpty()){
//            broadcast_id에 해당하는 방송이 없음
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
//        feedvote 정보
        List<FeedVote> feedVoteList = opt.get().getVote().getFeedVoteList();

//        dto 형식으로 변환
        List<FeedVoteDto> result = new ArrayList<>();
        for (FeedVote feedVote : feedVoteList) {
            result.add(new FeedVoteDto(feedVote.getFeed().getName(), feedVote.getFeed().getImg()));
        }

//        api 형식으로 변환
        return new ResponseEntity<FeedVoteApi>(new FeedVoteApi(result), HttpStatus.OK);

    }
}
