package com.marizoo.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class BroadcastsDto {
    // 방송 제목, 방송 써멘일
    private String title;
    private String thumbnail;
    private String classification;
}
