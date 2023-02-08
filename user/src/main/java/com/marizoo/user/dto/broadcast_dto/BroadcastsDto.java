package com.marizoo.user.dto.broadcast_dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class BroadcastsDto {
    // 방송 제목, 방송 썸네일, 종
    private Long id;
    private String title;
    private String thumbnail;
    private List<String> classificationImgs;
}
