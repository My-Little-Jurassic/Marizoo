package com.marizoo.user.dto.animal_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalDto {

    private String name;
    private String classification;
    private String img;

}
