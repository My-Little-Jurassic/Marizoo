package com.marizoo.user.dto.species_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpeciesListDto {
    private Long id;
    private String classification;
    private String classificationImg;
}
