package com.marizoo.owner.api.response;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class CreateBroadcastResponse {
    private Long broadcastId ;
    private Long voteId;

    public CreateBroadcastResponse(Long broadcastId, Long voteId) {
        this.broadcastId = broadcastId;
        this.voteId = voteId;
    }
}
