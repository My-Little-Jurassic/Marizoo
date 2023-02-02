package com.marizoo.user.controller;

import com.marizoo.user.api.animalstore_api.*;
import com.marizoo.user.dto.animalstore_dto.AnimalStoreDto;
import com.marizoo.user.dto.broadcast_dto.BroadcastsDto;
import com.marizoo.user.dto.play_dto.StorePlayDto;
import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.entity.Broadcast;
import com.marizoo.user.entity.BroadcastAnimal;
import com.marizoo.user.entity.Play;
import com.marizoo.user.service.AnimalService;
import com.marizoo.user.service.AnimalStoreService;
import com.marizoo.user.service.BroadcastService;
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
            @RequestParam(name = "species", required = false, defaultValue = "") String species){

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

    @PostMapping("/stores/{store_id}")
    public ResponseEntity<String> follow(@PathVariable(name = "store_id") String store_id, @RequestBody Long uid){

        return new ResponseEntity<>("성공", HttpStatus.OK);
    }


    @GetMapping("/stores/{store_id}")
    public ResponseEntity<ReservedAnimalStoreResponse> reserve(@PathVariable(name = "store_id") Long store_id){
        AnimalStore animalStore = animalStoreService.findAnimalStore(store_id);
        ReservedAnimalStoreResponse reservedStore =
                new ReservedAnimalStoreResponse(animalStore.getStoreName(),
                                                animalStore.getAddress(),
                                                animalStore.getTel());
        return new ResponseEntity<>(reservedStore, HttpStatus.OK);
    }

    @GetMapping("/stores/{store_id}/animals")
    public ResponseEntity<AnimalListResponse> ownedAnimal(@PathVariable(name = "store_id") Long store_id){
        AnimalListResponse OwnedAnimalList = new AnimalListResponse(animalService.findOwnedAnimal(store_id));
        return new ResponseEntity<>(OwnedAnimalList, HttpStatus.OK);
    }

    // 스트리밍 중인 영상 목록 조회
    @GetMapping("/stores/{store_id}/broadcasts")
    public ResponseEntity<BroadcastListResponse> getOnairBroadcast(@PathVariable(name = "store_id")Long store_id){
        List<Broadcast> onairs = broadcastService.getOnAirs();
        List<BroadcastsDto> result = new ArrayList<>();
        for (Broadcast onair : onairs) {
            log.info("animal store id ~~~~~~ : " + onair.getAnimalStore().getId());
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




}













