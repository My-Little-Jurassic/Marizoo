package com.marizoo.user.dto.animal_dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class OwnedAnimalDto {

    private String name;
    private String classification;
    private String img;

    public OwnedAnimalDto() {
    }

    @QueryProjection
    public OwnedAnimalDto(String name, String classification, String img) {
        this.name = name;
        this.classification = classification;
        this.img = img;
    }
}
