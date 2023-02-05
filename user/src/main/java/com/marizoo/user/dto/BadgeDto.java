package com.marizoo.user.dto;

/*
    마이페이지에서 배지 목록을 보여줄 정보
 */

import com.marizoo.user.entity.BadgeType;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BadgeDto {

    private String img;
    private BadgeType type;
    private String desc;

    @QueryProjection
    public BadgeDto(String img, BadgeType type, String desc) {
        this.img = img;
        this.type = type;
        this.desc = desc;
    }
}
