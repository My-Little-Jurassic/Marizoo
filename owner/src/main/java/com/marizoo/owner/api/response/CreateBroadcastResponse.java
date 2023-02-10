package com.marizoo.owner.api.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class CreateBroadcastResponse {
    private Long broadcastId ;
    private String sessionId;
    private String connectionToken;

    public CreateBroadcastResponse(Long broadcastId, String sessionId, String connectionToken) {
        this.broadcastId = broadcastId;
        this.sessionId = sessionId;
        this.connectionToken = connectionToken;
    }
}
