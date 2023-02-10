package com.marizoo.user.dto.broadcast_dto;

import com.marizoo.user.entity.BroadcastStatus;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class BroadcastStatusDto {
    private Long id;
    private BroadcastStatus status;

    @QueryProjection
    public BroadcastStatusDto(Long id, BroadcastStatus broadcastStatus){
        this.id = id;
        this.status = broadcastStatus;
    }

}
