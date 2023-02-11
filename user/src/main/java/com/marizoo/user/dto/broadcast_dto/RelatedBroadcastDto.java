package com.marizoo.user.dto.broadcast_dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Data;

@Data
public class RelatedBroadcastDto {
    private Long id;
    private String sessionId;
    private String title;
    private String thumbnail;

    public RelatedBroadcastDto(){
    }

    @QueryProjection
<<<<<<< HEAD:user/src/main/java/com/marizoo/user/dto/broadcast_dto/RelatedBroadcastDto.java
    public RelatedBroadcastDto(Long id, String sessionId, String title, String thumbnail){
=======
    public SearchBroadcastDto(Long id, String sessionId, String title, String thumbnail){
>>>>>>> 1b341438ac601d5aaac8c221f82ce78b77b78650:user/src/main/java/com/marizoo/user/dto/broadcast_dto/SearchBroadcastDto.java
        this.id = id;
        this.sessionId = sessionId;
        this.title = title;
        this.thumbnail = thumbnail;
    }
}
