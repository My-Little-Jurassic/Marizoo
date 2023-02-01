package com.marizoo.user.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExceptionResponseDto {

    private String message;

    public ExceptionResponseDto(String message) {
        this.message = message;
    }
}
