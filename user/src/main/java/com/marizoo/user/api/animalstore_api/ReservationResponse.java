package com.marizoo.user.api.animalstore_api;

import com.marizoo.user.dto.animalstore_dto.ReservationAnimalStoreDto;
import com.marizoo.user.dto.play_dto.ReservationPlayDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ReservationResponse {

    private ReservationAnimalStoreDto animalStoreInfo;
    private ReservationPlayDto playInfo;

}
