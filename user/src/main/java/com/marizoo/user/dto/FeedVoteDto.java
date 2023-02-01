package com.marizoo.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class FeedVoteDto {
    private String name;    // 먹이명
    private String img;     // 먹이 사진
}
