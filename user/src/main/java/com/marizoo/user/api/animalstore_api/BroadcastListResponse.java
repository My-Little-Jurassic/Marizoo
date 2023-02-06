package com.marizoo.user.api.animalstore_api;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BroadcastListResponse<T> {
    private T onAir;
}
