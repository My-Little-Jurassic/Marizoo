package com.marizoo.user.api.animalstore_api;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReservedAnimalStoreResponse {

    private String store_name;

    private String address;

    private String tel;
}
