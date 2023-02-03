package com.marizoo.user.controller;

import com.marizoo.user.api.animalstore_api.*;
import com.marizoo.user.dto.animalstore_dto.AnimalStoreDto;
import com.marizoo.user.dto.animalstore_dto.AnimalStoreWholeDto;
import com.marizoo.user.dto.broadcast_dto.BroadcastsDto;
import com.marizoo.user.dto.play_dto.StorePlayDto;
import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.entity.BroadcastAnimal;
import com.marizoo.user.entity.Play;
import com.marizoo.user.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StoreController {
    private final AnimalStoreService animalStoreService;
    private final AnimalService animalService;
    private final BroadcastService broadcastService;
    private final FeedService feedService;
    private final SpeciesService speciesService;
    private final ReservationService reservationService;

    @GetMapping("/stores")
    public ResponseEntity<AnimalStoreListResponse> storeList(){
        List<AnimalStore> AnimalStoreList = animalStoreService.findAnimalStores();
        List<AnimalStoreDto> AnimalStoreDtoList = AnimalStoreList.stream()
                .map(as -> new AnimalStoreDto(
                        as.getStoreName(),
                        as.getTel(),
                        as.getAddress(),
                        as.getProfileImg(),
                        as.getLat(),
                        as.getLng())).collect(Collectors.toList());

        return new ResponseEntity<>( new AnimalStoreListResponse(AnimalStoreDtoList), HttpStatus.OK);
    }


    @GetMapping("/stores/search")
    public ResponseEntity<AnimalStoreListResponse> store_search(
            @RequestParam(name = "storename", required = false, defaultValue = "") String storename,
            @RequestParam(name = "classification", required = false, defaultValue = "") String species){

        List<AnimalStore> storeList = new ArrayList<>();
        List<AnimalStoreDto> AnimalStoreDtoList;

        if(storename.length() == 0 && species.length() == 0){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }else{
            // 상호명 검색
            if(storename.length() != 0 && species.length() == 0){
                storeList = animalStoreService.findAnimalStoresbyNameSearch(storename);
            }
            // 종 검색
            if(storename.length() == 0 && species.length() != 0){
                storeList = animalStoreService.findAnimalStoresbySpeciesSearch(species);
            }

            // 검색 결과 API 객체로 변환.
            AnimalStoreDtoList = storeList.stream()
                    .map(as -> new AnimalStoreDto(
                            as.getStoreName(),
                            as.getTel(),
                            as.getAddress(),
                            as.getProfileImg(),
                            as.getLat(),
                            as.getLng())).collect(Collectors.toList());

            return new ResponseEntity<>(new AnimalStoreListResponse(AnimalStoreDtoList), HttpStatus.OK);
        }
    }

    // 팔로우
    @PostMapping("/stores/{store_id}")
    public ResponseEntity<String> follow(@PathVariable(name = "store_id") Long store_id,
                                         @RequestBody FollowRequest followRequest){
        animalStoreService.followingStore(store_id, followRequest.getUid());
        return new ResponseEntity<>("성공", HttpStatus.OK);
    }


    // 해당 가게 전체 정보 제공
    @GetMapping("/stores/{store_id}")
    public ResponseEntity<AnimalStoreWholeDto> reserveToStore(@PathVariable(name = "store_id") Long store_id){
        return new ResponseEntity<>(animalStoreService.findAnimalStore(store_id), HttpStatus.OK);
    }

    // 해당 가게 있는 동물 목록 조회.
    @GetMapping("/stores/{store_id}/animals")
    public ResponseEntity<AnimalListResponse> getOwnedAnimal(@PathVariable(name = "store_id") Long store_id){
        AnimalListResponse OwnedAnimalList = new AnimalListResponse(animalService.findOwnedAnimal(store_id));
        return new ResponseEntity<>(OwnedAnimalList, HttpStatus.OK);
    }

    // 스트리밍 중인 영상 목록 조회
    @GetMapping("/stores/{store_id}/broadcasts")
    public ResponseEntity<BroadcastListResponse> getOnairBroadcast(@PathVariable(name = "store_id")Long store_id){
        List<Broadcast> onairs = broadcastService.getOnAirs();
        List<BroadcastsDto> result = new ArrayList<>();
        for (Broadcast onair : onairs) {
            if(onair.getAnimalStore().getId() == store_id){
                List<String> classificationImgs = new ArrayList<>();
                for (BroadcastAnimal broadcastAnimal : onair.getBroadcastAnimalList()) {
                    classificationImgs.add(broadcastAnimal.getAnimal().getSpecies().getClassificationImg());
                }
                result.add(new BroadcastsDto(onair.getTitle(), onair.getThumbnail(), classificationImgs));
            }
        }
        return new ResponseEntity<>(new BroadcastListResponse(result), HttpStatus.OK);
    }


    // 가게 체험 프로그램 목록 제공
    @GetMapping("/stores/{store_id}/plays")
    public ResponseEntity<StorePlayListResponse> getPlayInProgress(@PathVariable(name = "store_id") Long store_id){
        List<Play> playlist = animalStoreService.findPlayByStore(store_id);
        List<StorePlayDto> playDtoList = playlist.stream()
                .map(m -> new StorePlayDto(
                        m.getTitle(),
                        m.getImg())).collect(Collectors.toList());

        return new ResponseEntity<>(new StorePlayListResponse(playDtoList), HttpStatus.OK);
    }

    // 체험 프로그램에 대한 정보 제공.
    @GetMapping("/stores/{store_id}/plays/{play_id}")
    public ResponseEntity<PlayAndStoreInfoResponse> getPlayInfo(@PathVariable(name = "store_id") Long storeId,
                                                                @PathVariable(name = "play_id") Long playId){
        return new ResponseEntity<>(animalStoreService.findPlayInfo(storeId, playId), HttpStatus.OK);
    }


    // 예약 정보 기입
    @GetMapping("/stores/books")
    public ResponseEntity postReservation(@RequestBody ReservationRequest reservationRequest){


        return new ResponseEntity(HttpStatus.OK);
    }

    // 동물 상세 정보 제공.
    @GetMapping("/stores/{animal_id}/animal_detail")
    public ResponseEntity<AnimalDetailResponse> getAnimalInfo(@PathVariable(name = "animal_id") Long animalId){
        AnimalDetailResponse animalDetailResponse = new AnimalDetailResponse(
                animalService.findAnimalInfo(animalId),
                animalStoreService.findStoreSubDto(animalId),
                speciesService.findSpeciesDetail(animalId),
                animalService.getBroadcastStatus(animalId),
                feedService.findFeedListforAnimal(animalId)
        );
        return new ResponseEntity(animalDetailResponse, HttpStatus.OK);
    }
    
    // 동물 종 정보 제공
    @GetMapping("/stores/{species_id}/species_detail")
    public ResponseEntity<SpeciesDetailResponse> getSpeciesInfo(@PathVariable(name = "species_id") Long speciesId){
        SpeciesDetailResponse speciesDetailResponse = new SpeciesDetailResponse(
                speciesService.findSpeciesInfo(speciesId),
                feedService.findFeedListforSpecies(speciesId)
        );
        return new ResponseEntity<>(speciesDetailResponse, HttpStatus.OK);
    }

    // 예약 정보 제공
    @GetMapping("/stores/books/{book_id}")
    public ResponseEntity<ReservationResponse> showReservationInfo(@PathVariable(name = "book_id") Long bookId){
        return new ResponseEntity<>(reservationService.getReservatonResult(bookId), HttpStatus.OK);
    }


}













