package com.marizoo.user.dto.animalstore_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class StoreSubDto {

    private Long storeId;
    private String storeName;
    private String img;

    public StoreSubDto(Long storeId, String storeName, String img) {
        this.storeId = storeId;
        this.storeName = storeName;
        this.img = img;
    }
}
