package com.marizoo.user.dto.play_dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class StorePlayDto {

    private Long id;
    private LocalDateTime playDateTime;
    private String title;
    private String description;
    private String img;

}
