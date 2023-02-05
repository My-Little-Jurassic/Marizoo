package com.marizoo.owner.api.request;

import com.marizoo.owner.dto.CreateBroadcastDto;
import com.marizoo.owner.dto.VoteDto;
import lombok.Data;

import java.util.List;

@Data
public class CreateBroadcastReq {
    private CreateBroadcastDto broadcastInfo;
    private VoteDto voteInfo;
}
