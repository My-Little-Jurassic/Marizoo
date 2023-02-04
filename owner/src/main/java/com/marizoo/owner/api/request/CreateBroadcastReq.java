package com.marizoo.owner.api.request;

import lombok.Data;

import java.util.List;

@Data
public class CreateBroadcastReq {

    private String title;
    private String description;
    private String thumbnail;
    private Long animalStoreId;
    private List<Long> animalIdList;
    private Long voteId;
}
