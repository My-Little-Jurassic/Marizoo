package com.marizoo.owner.api.request;

import com.marizoo.owner.dto.CreateVoteDto;
import lombok.Data;

@Data
public class CreateVoteRequest {
    private CreateVoteDto voteInfo;
}
