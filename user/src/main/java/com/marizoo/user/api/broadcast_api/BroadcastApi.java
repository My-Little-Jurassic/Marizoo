package com.marizoo.user.api.broadcast_api;

import com.marizoo.user.dto.broadcast_dto.BroadcastDto;
import com.marizoo.user.dto.broadcast_dto.onAirAnimalDto;
import com.marizoo.user.dto.broadcast_dto.onAirAnimalStoreDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

import java.util.List;

@Data
@AllArgsConstructor
@Getter

public class BroadcastApi {
    private BroadcastDto broadcast;
    private List<onAirAnimalDto> animals;
    private onAirAnimalStoreDto stores;
}
