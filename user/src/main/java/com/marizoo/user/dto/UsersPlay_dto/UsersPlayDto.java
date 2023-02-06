package com.marizoo.user.dto.UsersPlay_dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UsersPlayDto {

    private String storeName;
    private LocalDateTime playDateTime;

    public UsersPlayDto(){

    }

    @QueryProjection
    public UsersPlayDto(String storeName, LocalDateTime playDateTime){
        this.storeName = storeName;
        this.playDateTime = playDateTime;
    }

}
