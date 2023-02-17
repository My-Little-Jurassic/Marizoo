package com.marizoo.user.dto.animalstore_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalStoreDto {

    private Long id;
    private String store_name;
    private String tel;
    private String address;
    private String profile_img;
    private Float lat;
    private Float lng;
}
