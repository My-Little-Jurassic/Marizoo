package com.marizoo.owner.api.request;

import com.marizoo.owner.dto.EndVoteFeedDto;
import lombok.Data;

import java.util.List;

@Data
public class EndVoteRequest {
    private String title;
    private List<EndVoteFeedDto> result;
}
