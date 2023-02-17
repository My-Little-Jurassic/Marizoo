package com.marizoo.user.dto.species_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpeciesWholeDto {
    private Long speciesId;
    private String habitat;
    private String classification;
    private Integer lifeSpan;
    private String info;
    private String classificationImg;
}
