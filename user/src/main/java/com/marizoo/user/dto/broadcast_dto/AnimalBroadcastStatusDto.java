package com.marizoo.user.dto.broadcast_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalBroadcastStatusDto {
    private Long broadcastId;
    private boolean isOnair;
}
