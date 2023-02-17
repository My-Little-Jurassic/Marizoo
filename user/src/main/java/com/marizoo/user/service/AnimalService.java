package com.marizoo.user.service;

import com.marizoo.user.dto.SpeciesAnimalsDto;
import com.marizoo.user.dto.animal_dto.AnimalDetailDto;
import com.marizoo.user.dto.animal_dto.AnimalDto;
import com.marizoo.user.dto.animal_dto.OwnedAnimalDto;
import com.marizoo.user.dto.broadcast_dto.AnimalBroadcastStatusDto;
import com.marizoo.user.dto.broadcast_dto.BroadcastStatusDto;
import com.marizoo.user.dto.feed_dto.FeedDto;
import com.marizoo.user.entity.Animal;
import com.marizoo.user.entity.BroadcastStatus;
import com.marizoo.user.entity.Feed;
import com.marizoo.user.repository.animal_repo.AnimalRepository;
import com.marizoo.user.repository.animalstore_repo.AnimalStoreRepository;
import com.marizoo.user.repository.feed_repo.FeedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;
    private final AnimalStoreRepository animalStoreRepository;


    public List<OwnedAnimalDto> findOwnedAnimal(Long storeId){
        return animalStoreRepository.findOwnedAnimalInfo(storeId);
    }


    public AnimalBroadcastStatusDto getBroadcastStatus(Long animalId){
        BroadcastStatusDto broadcastStatusDto = animalRepository.findBroadcastStatus(animalId);

        if(broadcastStatusDto != null && broadcastStatusDto.getStatus() == BroadcastStatus.ONAIR){
            return new AnimalBroadcastStatusDto(broadcastStatusDto.getId(), true, broadcastStatusDto.getSessionId());
        }
        return new AnimalBroadcastStatusDto(-1L, false, "");
    }

    // 종에 해당하는 동물 목록 가져오기
    public List<SpeciesAnimalsDto> getSpeciesAnimals(Long speciesId) {
        List<Animal> bySpeciesId = animalRepository.findBySpeciesId(speciesId);
        return bySpeciesId.stream().map(a->new SpeciesAnimalsDto(a.getId(), a.getName(), a.getGender(), a.getImg())).collect(Collectors.toList());
    }

    // animal id에 해당하는 동물 정보, 가게 정보, 종 정보 가져오기
    public AnimalDetailDto getAnimalDetail(Long animalId){
        return animalRepository.findAnimalDetail(animalId);
    }
}
