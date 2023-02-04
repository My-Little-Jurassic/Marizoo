package com.marizoo.owner.dto;

import lombok.Data;

import java.util.List;

@Data
public class VoteDto {
    private String title;
    private List<Long> feedIdList;
}
