package com.marizoo.user.dto.broadcast_dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class SearchBroadcastDto {
    private Long id;
    private String title;
    private String thumbnail;

    public SearchBroadcastDto(){
    }

    @QueryProjection
    public SearchBroadcastDto(Long id, String title, String thumbnail){
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
    }
}
