package com.marizoo.owner.dto;

import lombok.Data;

import java.util.List;

@Data
public class CreateVoteDto {
    private String title;
    private List<Long> feedIdList;
}
