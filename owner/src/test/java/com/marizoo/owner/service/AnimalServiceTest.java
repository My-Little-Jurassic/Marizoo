package com.marizoo.owner.service;

import com.marizoo.owner.dto.OwnedAnimalDto;
import com.marizoo.owner.entity.AnimalStore;
import com.marizoo.owner.repository.animalStore.AnimalStoreRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
@Transactional
class AnimalServiceTest {
    @Autowired
    AnimalService animalService;

    @Test
    public void getOwnedAnimalList(){
        // given
        // 현재 1번 animal store에 4개의 동물이 있음
        // 현재 2번 animal store에 3개의 동물이 있음

        // when
        List<OwnedAnimalDto> ownedAnimalDtoList1 = animalService.findOwnedAnimal(1L);
        List<OwnedAnimalDto> ownedAnimalDtoList2 = animalService.findOwnedAnimal(2L);

        // then
        Assertions.assertThat(4).isEqualTo(ownedAnimalDtoList1.size());
        Assertions.assertThat(3).isEqualTo(ownedAnimalDtoList2.size());

    }

}