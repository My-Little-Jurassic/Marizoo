package com.marizoo.owner.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FeedListResponse<T> {
    private T feeds;
}
