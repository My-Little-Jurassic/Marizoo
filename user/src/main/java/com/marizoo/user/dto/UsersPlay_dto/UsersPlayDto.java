package com.marizoo.user.dto.UsersPlay_dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UsersPlayDto {

    private Long id;
    private String storeName;
    private String playTitle;
    private Integer runningTime;
    private Integer maxVisitor;
    private LocalDateTime playDateTime;

    public UsersPlayDto(){

    }

    @QueryProjection
    public UsersPlayDto(Long id, String storeName, String playTitle, Integer runningTime,  Integer maxVisitor, LocalDateTime playDateTime){
        this.id = id;
        this.storeName = storeName;
        this.playTitle = playTitle;
        this.runningTime = runningTime;
        this.maxVisitor = maxVisitor;
        this.playDateTime = playDateTime;
    }

}
