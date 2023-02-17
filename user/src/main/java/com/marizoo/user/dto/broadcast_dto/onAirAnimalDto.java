package com.marizoo.user.dto.broadcast_dto;

import com.marizoo.user.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class onAirAnimalDto {
    private Long id;
    private String name;
    private Gender gender;
    private String img;
    private String classification;
}
