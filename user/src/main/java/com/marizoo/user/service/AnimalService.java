package com.marizoo.user.service;

import com.marizoo.user.dto.animal_dto.AnimalDto;
import com.marizoo.user.dto.animal_dto.OwnedAnimalDto;
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

    public AnimalDto findAnimalInfo(Long animalId){
        Animal animal =  animalRepository.findAnimalById(animalId);
        AnimalDto animalDto = new AnimalDto(
                                    animal.getName(),
                                    animal.getGender(),
                                    animal.getFeature(),
                                    animal.getLength(),
                                    animal.getWeight(),
                                    animal.getAge(),
                                    animal.getImg());
        return animalDto;
    }

    public BroadcastStatusDto getBroadcastStatus(Long animalId){
        return animalRepository.findBroadcastStatus(animalId);
    }
}
