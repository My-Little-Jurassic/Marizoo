package com.marizoo.user.dto.animal_dto;

import com.marizoo.user.entity.Animal;
import com.marizoo.user.entity.AnimalStore;
import com.marizoo.user.entity.Gender;
import com.marizoo.user.entity.Species;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class AnimalDetailDto {
    private Animal animal;

    private AnimalStore animalStore;

    private Species species;

    @QueryProjection
    public AnimalDetailDto(Animal animal, AnimalStore animalStore, Species species){
        this.animal = animal;
        this.animalStore = animalStore;
        this.species = species;
    }

}
