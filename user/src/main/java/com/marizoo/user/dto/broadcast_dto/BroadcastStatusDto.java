package com.marizoo.user.dto.broadcast_dto;

import com.marizoo.user.entity.BroadcastStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BroadcastStatusDto {
    private BroadcastStatus status;

}
