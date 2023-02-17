package com.marizoo.owner.dto;

import lombok.Data;

import java.util.List;
@Data
public class CreateBroadcastDto {
    private String title;
    private String description;
    private Long animalStoreId;
    private List<Long> animalIdList;
}
