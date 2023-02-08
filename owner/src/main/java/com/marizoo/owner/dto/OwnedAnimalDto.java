package com.marizoo.owner.dto;

import com.marizoo.owner.entity.Gender;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class OwnedAnimalDto {

    private Long id;
    private String name;
    private String classification;

    public OwnedAnimalDto() {
    }

    @QueryProjection
    public OwnedAnimalDto(Long id, String name, String classification) {
        this.id = id;
        this.name = name;
        this.classification = classification;
    }
}


