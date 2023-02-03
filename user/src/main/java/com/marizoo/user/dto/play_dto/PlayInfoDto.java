package com.marizoo.user.dto.play_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PlayInfoDto {

    private LocalDateTime PlayDateTime;
    private String title;
    private String description;
    private Integer runningTime;
    private String notice;

}
