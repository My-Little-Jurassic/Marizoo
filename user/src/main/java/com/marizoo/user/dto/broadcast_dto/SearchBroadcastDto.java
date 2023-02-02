package com.marizoo.user.dto.broadcast_dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class SearchBroadcastDto {
    private String title;
    private String thumbnail;

    public SearchBroadcastDto(){
    }

    @QueryProjection
    public SearchBroadcastDto(String title, String thumbnail){
        this.title = title;
        this.thumbnail = thumbnail;
    }
}
