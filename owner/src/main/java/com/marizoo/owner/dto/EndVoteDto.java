package com.marizoo.owner.dto;

import lombok.Data;

import java.util.List;

@Data
public class EndVoteDto {
    private Long voteId;
    private List<EndVoteFeedDto> result;
}
