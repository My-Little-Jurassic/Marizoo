package com.marizoo.user.controller;

import com.marizoo.user.api.AnimalStoreListApi;
import com.marizoo.user.dto.AnimalstoreDto.AnimalStoreResponseDto;
import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.service.AnimalStore.AnimalStoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class StoreController {
    private final AnimalStoreService animalStoreService;

    @GetMapping("/store")
    public ResponseEntity<AnimalStoreListApi> storeList(){
        List<AnimalStore> AnimalStoreList = animalStoreService.findAnimalStores();
        List<AnimalStoreResponseDto> AnimalStoreDtoList = AnimalStoreList.stream()
                .map(as -> new AnimalStoreResponseDto(
                        as.getStoreName(),
                        as.getTel(),
                        as.getAddress(),
                        as.getProfileImg(),
                        as.getLat(),
                        as.getLng())).collect(Collectors.toList());


        return new ResponseEntity<>(
                new AnimalStoreListApi(AnimalStoreDtoList.size(), AnimalStoreDtoList), HttpStatus.OK);
    }



}
