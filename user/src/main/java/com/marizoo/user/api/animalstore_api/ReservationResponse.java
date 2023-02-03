package com.marizoo.user.api.animalstore_api;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReservationResponse {

    private Long userPlayId;
    private String store_name;
    private LocalDateTime playDateTime;
    private Integer totalVisitor;

}
