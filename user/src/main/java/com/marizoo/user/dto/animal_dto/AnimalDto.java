package com.marizoo.user.dto.animal_dto;

import com.marizoo.user.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalDto {

    private String name;
    private Gender gender;
    private String feature;
    private Integer length;
    private Integer weight;
    private Integer age;
    private String img;

}
