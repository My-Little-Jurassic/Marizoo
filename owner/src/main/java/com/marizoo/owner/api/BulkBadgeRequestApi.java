package com.marizoo.owner.api;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BulkBadgeRequestApi {

    private List<Long> userIdList;
    private Long badgeId;
}

