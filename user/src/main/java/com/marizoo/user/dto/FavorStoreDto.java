package com.marizoo.user.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FavorStoreDto {

    private Long animalStoreId;
    private String storeName;

    @QueryProjection
    public FavorStoreDto(Long animalStoreId, String storeName) {
        this.animalStoreId = animalStoreId;
        this.storeName = storeName;
    }
}
