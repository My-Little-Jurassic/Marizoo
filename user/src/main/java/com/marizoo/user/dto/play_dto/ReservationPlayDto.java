package com.marizoo.user.dto.play_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReservationPlayDto {
    private Long userPlayId;
    private String playTitle;
    private Integer runningTime;
    private LocalDateTime playDateTime;
    private Integer totalVisitor;
}
