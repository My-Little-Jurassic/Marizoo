package com.marizoo.user.dto.animalstore_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AnimalStoreWholeDto {

    private Long storeId;
    private String storename;
    private String description;
    private String address;
    private String openingHours;
    private String tel;
    private String email;
    private String profileImg;
    private Float lat;
    private Float lng;

}
