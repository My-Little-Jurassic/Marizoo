package com.marizoo.user.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FavorStoreDto {

    private Long animalStoreId;
    private String storeName;
    private String tel;
    private String address;
    private String img;

    @QueryProjection
    public FavorStoreDto(Long animalStoreId, String storeName, String tel, String address, String img) {
        this.animalStoreId = animalStoreId;
        this.storeName = storeName;
        this.tel = tel;
        this.address = address;
        this.img = img;
    }
}
