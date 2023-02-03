package com.marizoo.user.api.animalstore_api;

import com.marizoo.user.dto.animalstore_dto.StoreInfoDto;
import com.marizoo.user.dto.play_dto.PlayInfoDto;
import com.marizoo.user.dto.play_dto.StorePlayDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlayAndStoreInfoResponse {
    private PlayInfoDto playInfo;
    private StoreInfoDto storeInfo;

}
