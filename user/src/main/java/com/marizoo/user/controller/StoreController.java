package com.marizoo.user.controller;

import com.marizoo.user.api.animalstore_api.AnimalStoreListResponse;
import com.marizoo.user.api.animalstore_api.ReservedAnimalStoreResponse;
import com.marizoo.user.dto.animalstore_dto.AnimalStoreDto;
import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.service.AnimalStoreService;
import io.swagger.models.Response;
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
                System.out.println("종 검색");
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

}
