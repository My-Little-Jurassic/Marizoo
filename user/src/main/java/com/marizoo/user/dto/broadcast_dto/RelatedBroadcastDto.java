package com.marizoo.user.dto.broadcast_dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class RelatedBroadcastDto {
    private Long id;
    private String sessionId;
    private String title;
    private String thumbnail;

    public RelatedBroadcastDto(){
    }

    @QueryProjection
    public RelatedBroadcastDto(Long id, String sessionId, String title, String thumbnail){
        this.id = id;
        this.sessionId = sessionId;
        this.title = title;
        this.thumbnail = thumbnail;
    }
}
