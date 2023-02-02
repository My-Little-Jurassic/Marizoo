package com.marizoo.user.dto.species_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpeciesDto {

    private String habitat;
    private String classification;

    private Integer lifeSpan;
    private String info;

}
