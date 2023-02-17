package com.marizoo.user.dto.animal_dto;

import com.marizoo.user.entity.Gender;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class OwnedAnimalDto {

    private Long id;
    private String name;
    private String classification;
    private String img;
    private Gender gender;

    public OwnedAnimalDto() {
    }

    @QueryProjection
    public OwnedAnimalDto(Long id, String name, String classification, String img, Gender gender) {
        this.id = id;
        this.name = name;
        this.classification = classification;
        this.img = img;
        this.gender = gender;
    }
}
