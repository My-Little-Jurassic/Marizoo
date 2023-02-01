package com.marizoo.user.controller;

import com.marizoo.user.api.AnimalStoreListResponse;
import com.marizoo.user.dto.AnimalstoreDto.AnimalStoreDto;
import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.service.AnimalStoreService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
public class StoreController {
    private final AnimalStoreService animalStoreService;

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

        if(storename.length() == 0 && species.length() == 0){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

        // 상호명 검색
        if(storename.length() != 0 && species.length() == 0){
            List<AnimalStore> storeList = animalStoreService.findAnimalStoresbyNameSearch(storename);
            List<AnimalStoreDto> AnimalStoreDtoList = storeList.stream()
                    .map(as -> new AnimalStoreDto(
                            as.getStoreName(),
                            as.getTel(),
                            as.getAddress(),
                            as.getProfileImg(),
                            as.getLat(),
                            as.getLng())).collect(Collectors.toList());

            return new ResponseEntity<>(new AnimalStoreListResponse(AnimalStoreDtoList), HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);

//        if(storename.length() == 0 && species.length() != 0){
//
//        }

//        if(storename.length() != 0 && species.length() != 0){
//
//        }

    }

    @Data
    @AllArgsConstructor
    static class ggg{
        private String storename;
        private String species;
    }






}
