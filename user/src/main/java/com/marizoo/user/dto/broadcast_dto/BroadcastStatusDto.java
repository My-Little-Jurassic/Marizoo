package com.marizoo.user.dto.broadcast_dto;

import com.marizoo.user.entity.BroadcastStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class BroadcastStatusDto {
    private Long id;
    private BroadcastStatus status;
    private String sessionId;

    @QueryProjection
    public BroadcastStatusDto(Long id, BroadcastStatus broadcastStatus, String sessionId){
        this.id = id;
        this.status = broadcastStatus;
        this.sessionId = sessionId;
    }

}
