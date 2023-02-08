package com.marizoo.owner.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class FeedDto {
    private Long id;
    private String name;
    private String img;

    public FeedDto(){}

    @QueryProjection
    public FeedDto(Long id, String name, String img){
        this.id = id;
        this.name = name;
        this.img = img;
    }
}
