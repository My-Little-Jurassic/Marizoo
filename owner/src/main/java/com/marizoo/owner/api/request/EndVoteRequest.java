package com.marizoo.owner.api.request;

import com.marizoo.owner.dto.EndVoteDto;
import lombok.Data;

@Data
public class EndVoteRequest {
    private EndVoteDto voteInfo;
}
