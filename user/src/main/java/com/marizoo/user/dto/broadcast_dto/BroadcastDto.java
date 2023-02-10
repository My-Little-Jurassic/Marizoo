package com.marizoo.user.dto.broadcast_dto;

import com.marizoo.user.entity.AnimalStore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Getter
public class BroadcastDto {
    // 방송 제목, 방송 설명
    private String title;
    private String description;
}
