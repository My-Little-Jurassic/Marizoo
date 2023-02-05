package com.marizoo.user.api;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WatchEndRequestApi {

    private Long userId;
    private Integer effectCount;
    private Integer feedCount;
    private Integer watchTime;
}
