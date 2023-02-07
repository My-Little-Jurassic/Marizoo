package com.marizoo.user.controller;

import com.marizoo.user.api.broadcast_api.BroadcastApi;
import com.marizoo.user.api.broadcast_api.FeedVoteApi;
import com.marizoo.user.api.broadcast_api.OnairApi;
import com.marizoo.user.dto.broadcast_dto.*;
import com.marizoo.user.entity.*;
import com.marizoo.user.service.BroadcastService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class BroadcastController {
    private final BroadcastService broadcastService;

    @ApiOperation(value= "현재 방송 중인 목록 가져오기")
    @GetMapping("/broadcasts")
    public ResponseEntity<?> getOnairs(){
        // 현재 방송 중인 목록 가져오기
        List<Broadcast> onairs = broadcastService.getOnAirs();
        List<BroadcastsDto> result = new ArrayList<>();
        for (Broadcast onair : onairs) {
            List<String> classificationImgs = new ArrayList<>();
            for (BroadcastAnimal broadcastAnimal : onair.getBroadcastAnimalList()) {
                classificationImgs.add(broadcastAnimal.getAnimal().getSpecies().getClassificationImg());
            }
            result.add(new BroadcastsDto(onair.getTitle(), onair.getThumbnail(), classificationImgs));
        }
        return new ResponseEntity<>(new OnairApi(result), HttpStatus.OK);
    }

    @ApiOperation(value = "broadcast_id에 해당하는 방송 정보를 가져오기", notes = "방송 정보, 방송 출연 동물 정보, 방송 가게 정보")
    @GetMapping("/broadcasts/{broadcast_id}")
    public ResponseEntity<?> getBroadcastInfo(@PathVariable("broadcast_id") @ApiParam(name = "방송 id", required = true, example = "1") Long broadcastId){
        // broadcast_id에 해당하는 방송 정보 가져오기.

        Broadcast broadcast = broadcastService.getBroadcast(broadcastId);
        if(broadcast == null){
            // broadcast_id에 해당하는 방송이 없음
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // 방송 정보  |  dto 형식으로 변환
        BroadcastDto broadcastDto = new BroadcastDto(broadcast.getTitle(), broadcast.getDescription());

        // 방송 출연 동물 정보  |  dto 형식으로 변환
        List<BroadcastAnimal> broadcastAnimalList = broadcast.getBroadcastAnimalList();
        List<onAirAnimalDto> animals = new ArrayList<>();
        for (BroadcastAnimal broadcastAnimal : broadcastAnimalList) {
            Animal animal = broadcastAnimal.getAnimal();
            animals.add(new onAirAnimalDto(animal.getId(), animal.getName(), animal.getGender(), animal.getImg(), animal.getSpecies().getClassification()));
        }

        // 방송 주체 = 가게  |  dto 형식으로 변환
        AnimalStore animalStore = broadcast.getAnimalStore();
        onAirAnimalStoreDto animalStoreDto = new onAirAnimalStoreDto(animalStore.getId(), animalStore.getStoreName(), animalStore.getProfileImg());

//        api 형식으로 변환
        return new ResponseEntity<BroadcastApi>(new BroadcastApi(broadcastDto, animals, animalStoreDto), HttpStatus.OK);
    }

    @ApiOperation(value = "broadcast_id에 해당하는 vote 정보 가져오기")
    @GetMapping("/broadcasts/{broadcast_id}/vote")
    public ResponseEntity<?> getBroadcastVote(@PathVariable("broadcast_id") @ApiParam(name = "방송 id", required = true, example = "1") Long broadcastId){
//        feedvote 정보
        List<FeedVote> feedVoteList = broadcastService.getFeedVote(broadcastId);

        if(feedVoteList == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
//        dto 형식으로 변환
        List<FeedVoteDto> result = new ArrayList<>();
        for (FeedVote feedVote : feedVoteList) {
            result.add(new FeedVoteDto(feedVote.getFeed().getName(), feedVote.getFeed().getImg()));
        }

//        api 형식으로 변환
        return new ResponseEntity<FeedVoteApi>(new FeedVoteApi(result), HttpStatus.OK);

    }
@ApiOperation(value = "keyword에 해당하는 종이 방송에 출연하는 현재 방송중인 방송 목록 가져오기")
    @GetMapping("/broadcasts/search")
    public ResponseEntity<?> getSearchOnairs(@RequestParam(value = "keyword") @ApiParam(name = "검색어", required = true)String keyword){
        List<SearchBroadcastDto> searchOnairs = broadcastService.searchOnAirsHavingSpeciesList(keyword);
        if(searchOnairs.isEmpty()){
            return new ResponseEntity<>("검색 결과 없음", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new OnairApi(searchOnairs), HttpStatus.OK);
    }

    @ApiOperation(value = "broadcast_id 방송과 연관된 방송 목록 가져오기")
    @GetMapping("/broadcasts/{broadcast_id}/related")
    public ResponseEntity<?> getRelatedOnairs(@PathVariable("broadcast_id") @ApiParam(name = "방송 id", required = true, example = "1")Long broadcastId){
        List<SearchBroadcastDto> relatedOnairs = broadcastService.searchBroadcastRelated(broadcastId);
        if(relatedOnairs.isEmpty()){
            return new ResponseEntity<>("관련 방송 없음", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new OnairApi(relatedOnairs), HttpStatus.OK);
    }
}
