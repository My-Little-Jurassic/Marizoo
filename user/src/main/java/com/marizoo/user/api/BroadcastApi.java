package com.marizoo.user.api;

import com.marizoo.user.dto.BroadcastDto;
import com.marizoo.user.dto.onAirAnimalDto;
import com.marizoo.user.dto.onAirAnimalStoreDto;
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
