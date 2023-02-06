package com.marizoo.owner.api.request;

import lombok.Data;

import java.util.List;

@Data
public class AnimalFeedRequest {
    List<Long> animalIdList;
}
