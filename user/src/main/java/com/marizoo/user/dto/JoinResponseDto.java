package com.marizoo.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinResponseDto {

    private String message;

    public JoinResponseDto(String message) {
        this.message = message;
    }
}
