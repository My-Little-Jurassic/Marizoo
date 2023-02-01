package com.marizoo.user.controller;

import com.marizoo.user.api.BroadcastApi;
import com.marizoo.user.dto.onAirAnimalDto;
import com.marizoo.user.dto.onAirAnimalStoreDto;
import com.marizoo.user.dto.BroadcastDto;
import com.marizoo.user.dto.BroadcastsDto;
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
            // 방송 정보를 찾는데 없음
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Broadcast broadcast = opt.get();

        // 방송 정보
        BroadcastDto broadcastDto = new BroadcastDto(broadcast.getTitle(), broadcast.getDescription());

        // 방송 출연 동물 정보
        List<BroadcastAnimal> broadcastAnimalList = broadcast.getBroadcastAnimalList();
        List<onAirAnimalDto> animals = new ArrayList<>();
        for (BroadcastAnimal broadcastAnimal : broadcastAnimalList) {
            Animal animal = broadcastAnimal.getAnimal();
            animals.add(new onAirAnimalDto(animal.getName(), animal.getGender(), animal.getSpecies().getClassification()));
        }

        // 방송 주체 = 가게
        AnimalStore animalStore = broadcast.getAnimalStore();
        onAirAnimalStoreDto animalStoreDto = new onAirAnimalStoreDto(animalStore.getStoreName(), animalStore.getProfileImg());

        return new ResponseEntity<BroadcastApi>(new BroadcastApi(broadcastDto, animals, animalStoreDto), HttpStatus.OK);
    }
}
