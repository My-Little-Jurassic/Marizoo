package com.marizoo.user.dto;

import com.marizoo.user.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SpeciesAnimalsDto {
    private Long id;
    private String name;
    private Gender gender;
    private String img;
}
